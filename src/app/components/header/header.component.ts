import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Observable, Subject } from 'rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string;
  private _subscription;

  constructor(private _service: AuthService) { 
    this._subscription = this._service.userInfo.subscribe( (value) => {
      this.username = value.username;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
