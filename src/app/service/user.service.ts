import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { user } from '../Model/login';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }



  url = "http://localhost:3000/user";
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

  getRegistration() {
    return this.http.get(this.url);
  }

  postRegistration(user: user): Observable<user> {
    return this.http.post<user>(this.url, user)
  }

  

}
