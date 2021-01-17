import { SwalService } from './../../shared/services/swal.service';
import { UserService } from 'src/app/services/user.service';
import { Constants } from './../../shared/utils/constants';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';

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
    protected router: Router,
    private userService: UserService,
    private swalService: SwalService
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

  public steamLogin() {
    window.location.href = `${Constants.SERVER_BASE_URL}/api/authentication/steam-login`;
  }

  public discordLogin(): void {
    window.location.href = Constants.DISCORD_OAUTH_URL;
  }

  public facebookLogin(): void {
    window.open('https://www.facebook.com', '_blank');
  }

  public forgotPassword(): void {
    this.swalService.resetPassword().then((res) => {
      this.userService.resetPassword(res.value, '', '', true).subscribe(() => {
        this.swalService.showSuccessResult(
          'Success',
          'Your new password was sent to your email'
        );
      });
    });
  }
}
