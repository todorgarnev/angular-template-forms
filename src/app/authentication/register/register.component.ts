import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public model: RegisterModel;

  constructor() {
    this.model = new RegisterModel('', '', '', '', '', 18);
  }

  register() {
    delete this.model['confirmPassword'];
    console.log('regiter..');
  }

  ngOnInit() {
  }

}
