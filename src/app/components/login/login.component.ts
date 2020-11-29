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
  public username: string;
  public password: string;
  private _returnUrl: string;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    protected router: Router
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/newsfeed']);
    }

    this._returnUrl = '/newsfeed';
    this.route.queryParams
      .pipe(filter((params) => params.returnUrl))
      .subscribe((params) => {
        if (params != null) {
          this._returnUrl = params.returnUrl;
        } else {
          this._returnUrl = '/newsfeed';
        }
      });
  }

  public login() {
    this.authenticationService
      .login(this.username, this.password)
      .subscribe((_) => {
        this.router.navigate(['/newsfeed']);
      });
  }

  public register() {
    this.router.navigate(['/register']);
  }
}
