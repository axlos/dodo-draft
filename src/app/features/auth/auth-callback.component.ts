import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { combineLatest, firstValueFrom } from "rxjs";

import { AuthService } from "../../core/services/auth.service";
import { filter } from "rxjs/operators";

@Component({
  templateUrl: './auth-callback.component.html'
})
export class AuthCallbackComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.handleRedirectCallback();
  }

  private async handleRedirectCallback() {
    // Call when app reloads after user logs in with Auth0
    const params = window.location.search;
    if (params.includes('code=') && params.includes('state=')) {
      combineLatest([
        this.authService.auth0.user$,
        this.authService.auth0.isAuthenticated$,
        this.authService.auth0.getAccessTokenSilently()
      ]).pipe(
        filter(([auth0User, loggedIn, idToken]) =>
          loggedIn !== null && auth0User !== null && idToken !== null
        ),
      ).subscribe(([auth0User, loggedIn, idToken]) =>
        this.router.navigate(['/proposal/create'])
      );
    } else if (params.includes('error=access_denied')) {
      this.router.navigate(['/home'], {
        queryParams: {
          error: 'access_denied',
        },
      });
    }

  }
}
