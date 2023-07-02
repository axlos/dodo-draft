import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../../core/services/auth.service";

@Component({
  templateUrl: './auth-callback.component.html'
})
export class AuthCallbackComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.handleRedirectCallback();
  }

  private handleRedirectCallback(): void {
    this.authService.auth0.handleRedirectCallback().subscribe(() =>
      this.router.navigate(['/proposal/create'])
    );
  }
}
