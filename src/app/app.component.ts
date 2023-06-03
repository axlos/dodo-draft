import { Component, Inject, OnInit } from '@angular/core';
import { NB_WINDOW, NbMenuService } from '@nebular/theme';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { filter, map } from 'rxjs/operators';
import { Observable } from "rxjs";
import * as UserActions from "./core/store/actions/user.actions";
import { HeaderMenuModel } from "./core/models/header-menu.model";
import { coreFeature } from "./core/store/features/core.feature";
import * as JobActions from "./features/proposal/store/job/job.actions";
import { HeaderMenu } from "./core/enums/header-menu.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public items = [
    { title: 'Buy Credits' },
    { title: 'Logout' },
  ];
  public headerMenu$: Observable<HeaderMenuModel[] | null>;

  constructor(
    private router: Router,
    private store: Store,
    private nbMenuService: NbMenuService,
    @Inject(NB_WINDOW) private window: Window,
  ) {
    this.headerMenu$ = this.store.select(coreFeature.selectHeaderMenu);

    // Dispatch an action to load the user once the page is loaded
    this.store.dispatch(UserActions.LoadActions.do());
  }

  ngOnInit() {

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) =>
          tag === 'my-context-menu'),
        map(({ item: { title } }) =>
          title
        ),
      )
      .subscribe(title =>
        console.log(`${title} was clicked!`)
      );
  }

  public onAction(item: HeaderMenuModel): void {
    if (HeaderMenu.Create === item.id) {
      this.store.dispatch(JobActions.CreateActions.reset());
    }
    this.router.navigate([item.router]);
  }
}
