import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public model: LoginModel;
  public loginFailed: boolean;
  public errMessage: string;

  constructor(private authService: AuthService) {
    this.model = new LoginModel('', '');
  }

  login() {
    this.authService.login(this.model)
      .subscribe(
        data => {
          console.dir(data);
        },
        err => {
          this.loginFailed = true;
          this.errMessage = err.error.description;
        }
      );
  }

  ngOnInit() {
  }

}
