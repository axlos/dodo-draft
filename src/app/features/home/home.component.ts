import { Component } from '@angular/core';
import * as AuthActions from '../../core/store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { ViewportScroller } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private store: Store
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        filter(() => !!this.route.snapshot.fragment)
      )
      .subscribe(() => {
        this.viewportScroller.scrollToAnchor(this.route.snapshot.fragment);
      });
  }

  public signup(): void {
    this.store.dispatch(
      AuthActions.LoginActions.do({
        screenHint: 'signup',
      })
    );
  }
}
