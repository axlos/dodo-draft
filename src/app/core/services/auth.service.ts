import { Injectable } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { HttpClient } from "@angular/common/http";
import { filter } from "rxjs/operators";

import { combineLatest, Observable } from 'rxjs';
import { LoginActions } from "../store/actions/auth.actions";

@Injectable()
export class AuthService {

  constructor(
    public auth0: Auth0Service,
    private store: Store,
    private http: HttpClient
  ) {
    // Dispatch login/logout actions after login or logout
    combineLatest([
      this.auth0.isAuthenticated$,
      this.auth0.user$
    ]).pipe(
      filter(([isAuthenticated, user]) =>
        isAuthenticated && user !== null
      )
    ).subscribe(([isAuthenticated, user]) =>
      this.store.dispatch(
        LoginActions.success({ user, isAuthenticated })
      )
    );

  }

  public logout(): void {
    this.auth0.logout({
      logoutParams: {
        returnTo: `${window.location.origin}/home`
      }
    });
  }

  public login(screenHint: string = 'login'): void {
    this.auth0.loginWithRedirect({
      authorizationParams: {
        screen_hint: screenHint
      }
    });
  }

  public getAccessTokenSilently(): Observable<string> {
    return this.auth0.getAccessTokenSilently();
  }

  public verifyProfile(): Observable<any> {
    return this.http.put('/api/auth/verify', {});
  }

}
