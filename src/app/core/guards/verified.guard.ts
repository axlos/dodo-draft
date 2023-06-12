import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, take } from "rxjs";
import { filter, map } from "rxjs/operators";
import { authFeature } from "../store/features/auth.feature";
import { SetupProfile } from "../../features/profile/enums/setup-profile.enum";

@Injectable()
export class VerifiedGuard implements CanActivate {

  constructor(
    private store: Store,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.store.select(authFeature.selectUser);
    return user.pipe(
      filter(user =>
        user !== null
      ),
      map(user => {
        if (SetupProfile.Verified !== user['setupProfile']) {
          return this.router.parseUrl('/profile/setup');
        } else {
          return true;
        }
      }),
      take(1)
    );
  }

}
