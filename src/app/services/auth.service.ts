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

  userInfo: User;
  isLoggedIn = new Subject<boolean>();

  constructor(private _http: HttpClient, private _router: Router) { }

  register(regUserData: RegisterUser) {
    return this._http.post(`${API_URL}/users/`, regUserData);
  }

  login(loginUserData: LoginUser) {
    return this._http.post(`${API_URL}/auth/login`, loginUserData).subscribe
    ( (token: Token) => {
      localStorage.setItem('auth_token', token.Authorization);
      this._router.navigate(['/']);
      this.isLoggedIn.next(true);
    });
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn.next(false);
    
    return this._http.post(`${API_URL}/auth/logout`, { headers: this.setHeaders() });
  }

  private setHeaders(): HttpHeaders {
      const authHeader = new HttpHeaders()
        .set('Authorization', localStorage.getItem('auth_token'));
  }
}
