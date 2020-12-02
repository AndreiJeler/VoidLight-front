import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalService } from '../../shared/services/swal.service';

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
  public form: FormGroup;
  private _swalService: SwalService;

  constructor(swalService: SwalService)
  {
    this._swalService = swalService;
  }

  ngOnInit(): void {
    
  }

  public register() {
    if (this.password != this.confirmPassword || this.password == null)
    {
      this._swalService.showErrorNotification("Passwords do not match!");
    }
    this.form = new FormGroup({
      username: new FormControl(this.username, [
        Validators.required,
        Validators.minLength(4)
      ]),
      password: new FormControl(this.password, [
        Validators.required,
        Validators.minLength(8)
      ]),
      email: new FormControl(this.email, [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ])
    });
  }

  get usernameCheck() {
    return this.form.get('username');
  }

  get emailCheck() {
    return this.form.get('email');
  }

  get passwordCheck() {
    return this.form.get('password');
  }
}
