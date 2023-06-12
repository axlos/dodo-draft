import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, take } from "rxjs";
import { filter, map } from "rxjs/operators";
import { authFeature } from "../../../core/store/features/auth.feature";
import { SetupProfile } from "../enums/setup-profile.enum";

@Injectable()
export class SetupGuard implements CanActivate {

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
        if (SetupProfile.Verified === user['setupProfile']) {
          return this.router.parseUrl('/proposal/create');
        } else {
          return true;
        }
      }),
      take(1)
    );
  }

}
