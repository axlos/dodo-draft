import { Injectable } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { LoginActions } from '../store/actions/auth.actions';
import { filter } from "rxjs/operators";

@Injectable()
export class AuthService {

  constructor(
    private auth0: Auth0Service,
    private store: Store
  ) {
    // Dispatch login/logout actions after login or logout
    combineLatest([
      this.auth0.isAuthenticated$,
      this.auth0.user$
    ]).pipe(
      filter(([isAuthenticated]) =>
        isAuthenticated
      )
    ).subscribe(([isAuthenticated, user]) =>
      this.store.dispatch(
        LoginActions.success({ user, isAuthenticated })
      )
    );
  }

  public logout(): void {
    this.auth0.logout();
  }

  public login(): void {
    this.auth0.loginWithRedirect({});
  }

  public getAccessTokenSilently(): Observable<string> {
    return this.auth0.getAccessTokenSilently();
  }

}
