import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/RegisterUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../models/token';
import { LoginUser } from '../models/loginUser';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';

const API_URL = 'http://localhost:5000/api/v1';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo = new Subject<User>();
  isLoggedIn = new Subject<boolean>();

  constructor(private _http: HttpClient, private _router: Router) { }


  register(regUserData: RegisterUser) {
    return this._http.post(`${API_URL}/users/`, regUserData);
  }


  login(loginUserData: LoginUser) {
    console.log('api request');
    return this._http.post(`${API_URL}/auth/login`, loginUserData).subscribe
    ( (token: Token) => {
      localStorage.setItem('auth_token', token.Authorization);
      this.getMe();
      this._router.navigate(['/']);
      this.isLoggedIn.next(true);
    });
  }


  logout() {
    localStorage.clear();
    this.isLoggedIn.next(false);
    
    return this._http.post(`${API_URL}/auth/logout`, { headers: this.setHeaders() });
  }


  getMe() {
    return this._http.get(`${API_URL}/users/me`, { headers: this.setHeaders() })
      .subscribe( (user: User) => { this.userInfo.next(user); });
  }


  private setHeaders(): HttpHeaders {
      return new HttpHeaders()
        .set('Authorization', localStorage.getItem('auth_token'));
  }
}
