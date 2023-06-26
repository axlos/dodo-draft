import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from "@auth0/auth0-angular";

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(catchError((err: HttpErrorResponse) => {
          if (err.status === 401 && !window.location.href.includes('/login')) {
            // auto logout if 401 response returned from api
            // this.authService.logout();
            // location.reload();
          }

          const error = err.error.error || err.error.message || err.statusText;
          return throwError(error);
        })
      );
  }
}
