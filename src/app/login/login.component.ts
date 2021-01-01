import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule} from '@angular/forms';
import { url } from 'inspector';
import { UserService } from 'NotePadFront/src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Loginform: FormGroup;
  submitted = false;

  userchk = "userid"+"p"

  constructor(private fb:FormBuilder, private service: UserService, private httpnl: HttpClient) { }

  ngOnInit(): void {

    // this.Loginform = this.fb.group({
    //   userid: ['', [Validators.email, Validators.required]],
    //   psword: ['', [Validators.minLength(8), Validators.required]]

    // })

    this.Loginform = new FormGroup({
      userid: new FormControl (null, [Validators.required, Validators.email]),
      psword: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

    onSubmit(){
      console.log(this.Loginform.value);
      this.submitted = true;
      // this.saveLogin();
      
    }

    // saveLogin(){
    //   this.service.postRegistration(this.Loginform.value).subscribe(data => {
    //     console.log (data)}
    //   }
  


    //Getter Method

    get userid(){
      return this.Loginform.get('userid') as FormGroup;
    }

    get psword(){
      return this.Loginform.get('psword') as FormGroup;
    }

}
