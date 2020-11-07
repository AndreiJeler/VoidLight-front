import { User } from './../models/user';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  userSubscription: any;
  user = new User();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.userSubscription = this.authenticationService.currentUser.subscribe(
      (data) => {
        this.user = data;
      }
    );
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const expectedRole = route.data.expectedRole;

    return this.authenticationService.isAuthenticated().pipe(
      map((user: User) => {
        if (user.role === expectedRole) {
          return true;
        }
        this.router.navigate(['/unauthorized'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      }),
      catchError((_) => {
        this.router.navigate(['/unauthorized'], {
          queryParams: { returnUrl: state.url },
        });
        return of(false);
      })
    );
  }
}
