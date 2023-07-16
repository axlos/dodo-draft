import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from "./auth.service";

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.auth.getAccessTokenSilently()
      .pipe(
        mergeMap(token => {
          const tokenReq = req.clone({
            setHeaders: {
              authorization: `Bearer ${token}`,
              // withCredentials: 'true'
            }
          });
          return next.handle(tokenReq);
        }),
        catchError(() => next.handle(req))
      );
  }
}
