import { Component, Inject, OnInit } from '@angular/core';
import { NB_WINDOW, NbMenuService } from '@nebular/theme';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { filter, map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { HeaderMenuInterface } from "./core/interfaces/header-menu.interface";
import { coreFeature } from "./core/store/features/core.feature";
import * as JobActions from "./features/proposal/store/job/job.actions";
import * as AuthActions from "./core/store/actions/auth.actions";
import { HeaderMenu } from "./core/enums/header-menu.enum";
import { authFeature } from './core/store/features/auth.feature';
import { User } from "@auth0/auth0-spa-js";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public headerMenu$: Observable<HeaderMenuInterface[] | null>;
  public isAuthenticated$: Observable<boolean>;
  public user$: Observable<User>;

  constructor(
    private router: Router,
    private store: Store,
    private nbMenuService: NbMenuService,
    @Inject(NB_WINDOW) private window: Window,
  ) {
    this.headerMenu$ = this.store.select(coreFeature.selectHeaderMenu);
    this.isAuthenticated$ = this.store.select(authFeature.selectIsAuthenticated);
    this.user$ = this.store.select(authFeature.selectUser);
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
    this.router.navigate([item.router]);
  }

  public login(): void {
    this.store.dispatch(
      AuthActions.LoginActions.do()
    );
  }

}
