import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public username: string;
  public password: string;
  public confirmPassword: string;
  public email: string;

  constructor() { }

  ngOnInit() {
  }

  public register() {}

}
