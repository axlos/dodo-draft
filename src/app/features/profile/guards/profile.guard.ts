import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, take } from "rxjs";
import { userFeature } from "../../../core/store/features/user.feature";
import { map } from "rxjs/operators";
import { SetupProfile } from "../enums/setup-profile.enum";

@Injectable()
export class ProfileGuard implements CanActivate {

  constructor(
    private store: Store,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.store.select(userFeature.selectUser);

    return user.pipe(
      map(user => {
        if (user && SetupProfile.Verified !== user.setupProfile) {
          return true;
        } else {
          return this.router.parseUrl('/create-proposal');
        }
      }),
      take(1)
    );
  }

}
