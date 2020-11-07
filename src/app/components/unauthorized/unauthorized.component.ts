import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
})
export class UnauthorizedComponent implements OnInit {
  public returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this.route.queryParams
      .pipe(filter((params) => params.returnUrl))
      .subscribe((params) => {
        this.returnUrl = params.returnUrl;
      });
  }

  public goToLogin(): void {
    this.authenticationService.logout();
    this.router.navigate([''], {
      queryParams: { returnUrl: this.returnUrl },
    });
  }
}
