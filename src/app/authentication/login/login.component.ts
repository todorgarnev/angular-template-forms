import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public model: LoginModel;
  public loginFailed: boolean;
  public username: string;
  public errMessage: string;

  constructor(private authService: AuthService,
    private router: Router) {
    this.model = new LoginModel('', '');
  }

  login() {
    this.authService.login(this.model)
      .subscribe(
        data => {
          this.successfulLogin(data);
        },
        err => {
          this.loginFailed = true;
          this.errMessage = err.error.description;
        }
      );
  }

  successfulLogin(data) {
    this.authService.setAuthtoken(data['_kmd']['authtoken']);
    localStorage.setItem('authtoken', data['_kmd']['authtoken']);
    this.username = data['username'];
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
