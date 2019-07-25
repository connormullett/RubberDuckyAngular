import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { User } from '../../models/user';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  private _username: string;
  private _subscription;
  private _isLoggedIn

  constructor(private _service: AuthService) { 
    this._subscription = this._service.userInfo.subscribe( (value) => {
      this._username = value.username;
    });
    this._isLoggedIn = this._service.isLoggedIn.subscribe( (value) => {
      this._isLoggedIn = value;
    });
  }

  logout() {
    this._service.logout();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
    this._isLoggedIn.unsubscribe();
  }
}
