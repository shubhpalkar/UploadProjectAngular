import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {User} from "../registration/User"
import { UserService } from '../service/user.service';
 
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  private file: File;

  constructor (private service: UserService, private http: HttpClient){}

  RegistrationForm: FormGroup;
  notmatch = false;
  submitted = false;

  ngOnInit(): void {

this.RegistrationForm = new FormGroup({
  userid: new FormControl (null, [Validators.required, Validators.email]),
  username: new FormControl (null, [Validators.required]),
  psword: new FormControl (null, [Validators.required, Validators.minLength(8)]),
  cnfPsword: new FormControl (null,[Validators.required, Validators.minLength(8)]),
  filename: new FormControl (null, [Validators.required])
}, {validators: this.pswdmatching})
  }

  onSave(){
    console.log(this.RegistrationForm.value);
    this.submitted = true;
    this.saveRegistration();
    
    this.RegistrationForm.reset({});
  }

  pswdmatching(fg: FormGroup): Validators{
return fg.get('psword').value === fg.get('cnfPsword').value ? null : {notmatch : true}
  }

  getUser(){
    this.service.getRegistration().subscribe (data => {
      console.log (data);
    })
  }

  onFileChange(fileChangeEvent) {
    this.file = fileChangeEvent.target.files[0];
  }


  async saveRegistration(){
    this.service.postRegistration(this.RegistrationForm.value).subscribe(data => {
      console.log (data);
    })



    let formData = new FormData();
    formData.append('photo', this.file, this.file.name);

    this.http.post("http://localhost:3000/upload", formData).subscribe((response) => {
      console.log(response);
    });
  }


    
  

 
  

  //Getter Methods

  get userid(){
    return this.RegistrationForm.get('userid') as FormGroup;
  }

  get username(){
    return this.RegistrationForm.get('username') as FormGroup;
  }

  get psword(){
    return this.RegistrationForm.get('psword') as FormGroup;
  }

  get cnfPsword(){
    return this.RegistrationForm.get('cnfPsword') as FormGroup;
  }

  get filename(){
    return this.RegistrationForm.get('filename') as FormGroup;
  }

}
