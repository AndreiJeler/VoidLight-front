import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  public registerForm: FormGroup;
  public isSubmitted: boolean = false;

  constructor(private _formBuilder: FormBuilder, swalService: SwalService) {}

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      username: new FormControl(this.username, [
        Validators.required,
        Validators.pattern("^.{4,}$")
      ]),
      password: new FormControl(this.password, [
        Validators.required,
        Validators.pattern("^.{8,}$")
      ]),
      email: new FormControl(this.email, [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]),
      confirm: new FormControl('', [Validators.required]),
    },
    {
      validator: this.mustMatch('password', 'confirm')
    }
    );
  }

  get form() {
    return this.registerForm.controls;
  }

  public mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  public register() {
    this.isSubmitted = true;
  }
}
