import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  private _returnUrl: string;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    protected router: Router
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/home']);
    }

    this._returnUrl = '/home';
    this.route.queryParams
      .pipe(filter((params) => params.returnUrl))
      .subscribe((params) => {
        if (params != null) {
          this._returnUrl = params.returnUrl;
        } else {
          this._returnUrl = '/home';
        }
      });
  }

  public login() {
    this.authenticationService
      .login(this.username, this.password)
      .subscribe((_) => {
        this.router.navigate([this._returnUrl]);
      });
  }
}
