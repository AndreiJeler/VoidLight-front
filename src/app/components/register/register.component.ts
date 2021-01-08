import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SwalService } from '../../shared/services/swal.service';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public confirmPassword: string;
  public registerForm: FormGroup;
  public isSubmitted: boolean = false;
  public registerUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private swalService: SwalService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerUser = new User();
    this.registerForm = this.formBuilder.group(
      {
        username: new FormControl(this.registerUser.username, [
          Validators.required,
          Validators.pattern('^.{4,}$'),
        ]),
        password: new FormControl(this.registerUser.password, [
          Validators.required,
          Validators.pattern('^.{8,}$'),
        ]),
        email: new FormControl(this.registerUser.email, [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ]),
        confirm: new FormControl('', [Validators.required]),
      },
      {
        validator: this.mustMatch('password', 'confirm'),
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

  public register(): void {
    this.isSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.registerUser.username = this.registerForm.value.username;
    this.registerUser.password = this.registerForm.value.password;
    this.registerUser.email = this.registerForm.value.email;
    this.registerUser.fullName = this.registerUser.username;

    this.userService.createUser(this.registerUser).subscribe(() => {
      this.swalService.showSuccessNotification(
        'Please confirm your account, an email has been sent to your email address. <3'
      );
      this.router.navigate(['/login']);
    });
  }

  steamRegister(): void {
    window.location.href = 'https://localhost:5001/api/users/steam-register';
  }
}
