import { Constants } from './../shared/utils/constants';
import { AuthenticationService } from './../services/authentication.service';
import { SwalService } from './../shared/services/swal.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private swalService: SwalService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.authenticationService.logout();
          this.router.navigate([Constants.NOT_AUTHORIZED_URL]);
        } else {
          console.log(err);
          this.swalService.showErrorNotification(err.error.Detail);
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
