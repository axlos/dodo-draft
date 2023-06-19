import { Component, Inject, OnInit } from '@angular/core';
import { NB_WINDOW, NbMenuService } from '@nebular/theme';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { filter, map } from 'rxjs/operators';
import { combineLatest, Observable } from "rxjs";
import { HeaderMenuInterface } from "./core/interfaces/header-menu.interface";
import { HeaderMenu } from "./core/enums/header-menu.enum";
import { Profile } from "./core/models/profile.model";
import { AuthUser } from "./core/interfaces/auth-user.interface";
import { coreFeature } from "./core/store/features/core.feature";
import { authFeature } from './core/store/features/auth.feature';
import { profileFeature } from "./core/store/features/profile.feature";
import * as JobActions from "./features/proposal/store/job/job.actions";
import * as AuthActions from "./core/store/actions/auth.actions";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public headerMenu$: Observable<HeaderMenuInterface[] | null>;
  public isAuthenticated$: Observable<boolean>;
  public user$: Observable<AuthUser>;
  public profile$: Observable<Profile>;

  constructor(
    private router: Router,
    private store: Store,
    private nbMenuService: NbMenuService,
    @Inject(NB_WINDOW) private window: Window,
  ) {
    this.headerMenu$ = this.store.select(coreFeature.selectHeaderMenu);
    this.isAuthenticated$ = this.store.select(authFeature.selectIsAuthenticated);
    this.user$ = this.store.select(authFeature.selectUser);
    this.profile$ = this.store.select(profileFeature.selectProfile);
  }

  ngOnInit() {
    this.nbMenuService.onItemClick()
      .pipe(
        filter((menu) =>
          menu.tag === 'my-context-menu'),
        map(({ item: { title, ariaRole } }) =>
          ariaRole
        ),
      )
      .subscribe(ariaRole => {
          if (ariaRole === 'logout') {
            this.store.dispatch(
              AuthActions.LogoutActions.do()
            );
          }
        }
      );
  }

  public onAction(item: HeaderMenuInterface): void {
    if (HeaderMenu.Create === item.id) {
      this.store.dispatch(
        JobActions.CreateActions.reset()
      );
    }
    this.router.navigate([
      item.router
    ], {
      fragment: item.fragment
    });
  }

  public login(): void {
    this.store.dispatch(
      AuthActions.LoginActions.do({
        screenHint: 'login'
      })
    );
  }

  public onClickLogo(): void {
    this.isAuthenticated$
      .subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(['/proposal/history']);
        } else {
          this.router.navigate([
            '/home'
          ], {
            fragment: 'home'
          });
        }
      });
  }

  public get userName(): Observable<string> {
    return combineLatest([
      this.user$,
      this.profile$,
    ]).pipe(
      map(([user, profile]) => {
        if (user && profile) {
          return profile.fullName || user.name;
        }
        return 'Guest';
      })
    );
  }

}
