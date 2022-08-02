import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9]{3,}$/),
    ]),
  });

  constructor(private _Router: Router, private _ToastrService:ToastrService, private _UserService:UserService) {}

  login() {
    if (this.loginForm.valid) {
      this._UserService.userName=this.loginForm.controls['userName'].value;
      this._Router.navigate(['/products']);
      this._ToastrService.success('LoggedIn Successfuly', '',{closeButton:true});

    }
  }
  ngOnInit(): void {}
}
