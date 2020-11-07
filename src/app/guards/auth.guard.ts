import { User } from '../models/user';
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
export class AuthGuard implements CanActivate {
  userSubscription;
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

  canActivate(
    _: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authenticationService.isAuthenticated().pipe(
      map((_: User) => true),
      catchError((_) => {
        this.router.navigate([''], { queryParams: { returnUrl: state.url } });
        return of(false);
      })
    );
  }
}
