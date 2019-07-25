import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _loginForm: FormGroup;

  constructor(private _form: FormBuilder, private _service: AuthService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this._loginForm = this._form.group({
      email: new FormControl,
      password: new FormControl
    })
  }

  onSubmit() {
    console.log('form submitted');
    this._service
      .login(this._loginForm.value);
  }
}
