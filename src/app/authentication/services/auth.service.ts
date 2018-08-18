import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';

const appKey = 'kid_HyRvl9H87';
const appSecret = '0fcaf6f580a54b4c98cca92fb2b19c0e';
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentAuthtoken: string;

  constructor(private http: HttpClient) { }

  login(model: LoginModel) {
    return this.http.post(loginUrl,
      JSON.stringify(model));
  }

  register(model: RegisterModel) {
    return this.http.post(registerUrl,
      JSON.stringify(model));
  }

  logout() {
    return this.http.post(logoutUrl, {});
  }

  getAuthtoken() {
    return this.currentAuthtoken;
  }

  setAuthtoken(value: string) {
    this.currentAuthtoken = value;
  }

  checkIfLogged() {
    return localStorage.getItem('authtoken') !== null;
  }

  // USE INTERCEPTOR INSTEAD OF THIS
  // private createAuthHeaders(type: string) {
  //   if (type === 'Basic') {
  //     return new HttpHeaders({
  //       'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
  //       'Content-type': 'application/json'
  //     });
  //   } else {
  //     return new HttpHeaders({
  //       'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
  //       'Content-type': 'application/json'
  //     });
  //   }
  // }

}
