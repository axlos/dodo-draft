import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { NB_WINDOW, NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { filter, map } from 'rxjs/operators';
import { combineLatest, Observable } from "rxjs";
import { HeaderMenu } from "./core/enums/header-menu.enum";
import { Profile } from "./core/models/profile.model";
import { AuthUser } from "./core/interfaces/auth-user.interface";
import { coreFeature } from "./core/store/features/core.feature";
import { authFeature } from './core/store/features/auth.feature';
import { profileFeature } from "./core/store/features/profile.feature";
import * as JobActions from "./features/proposal/store/job/job.actions";
import * as AuthActions from "./core/store/actions/auth.actions";
import { TranslateService } from "@ngx-translate/core";
import * as ProfileActions from "./core/store/actions/profile.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public headerMenu$: Observable<NbMenuItem[]>;
  public isAuthenticated$: Observable<boolean>;
  public user$: Observable<AuthUser>;
  public profile$: Observable<Profile>;
  public breakpoints: string;
  public language: string = 'en';
  public languages: NbMenuItem[] = [
    {
      title: 'English',
      ariaRole: 'en'
    }, {
      title: 'Español',
      ariaRole: 'es'
    }
  ];

  constructor(
    private router: Router,
    private store: Store,
    private nbMenuService: NbMenuService,
    @Inject(NB_WINDOW) private window: Window,
    private sidebarService: NbSidebarService,
    private translate: TranslateService
  ) {
    translate.addLangs(['en', 'es']);
    // Set the default language
    this.switchLanguage(localStorage.getItem('language') ?? 'en');

    this.translate.onDefaultLangChange.subscribe((event): void => {
      this.headerMenu$ = this.store.select(coreFeature.selectHeaderMenu).pipe(
        map((headerMenu) => headerMenu.map((item) => (
            {
              ...item,
              title: this.translate.instant(item.title)
            }
          ))
        ));
    });
    this.isAuthenticated$ = this.store.select(authFeature.selectIsAuthenticated);
    this.user$ = this.store.select(authFeature.selectUser);
    this.profile$ = this.store.select(profileFeature.selectProfile);

    this.profile$
      .pipe(
        filter((profile) =>
          profile !== null
        )
      )
      .subscribe((profile) => {
        console.log('profile:', profile.language);
        // Switch the language when the profile is loaded
        this.switchLanguage(profile.language ?? 'en');
      });
  }

  ngOnInit() {
    this.breakpoints = window.innerWidth <= 576 ? 'sm' : 'md';

    this.nbMenuService.onItemClick()
      .subscribe(item => {
        switch (item.tag) {
          case 'language-menu':
            // Save language in local storage
            this.switchLanguage(item.item.ariaRole);
            // Save language in user profile if user is authenticated
            this.isAuthenticated$
              .pipe(
                filter((isAuthenticated) =>
                  isAuthenticated === true
                )
              )
              .subscribe((isAuthenticated) =>
                this.store.dispatch(
                  ProfileActions.SaveActions.do({
                    profile: {
                      language: item.item.ariaRole
                    }
                  })
                )
              );
            break;
          case 'user-menu':
            if (item.item.ariaRole === 'logout') {
              this.store.dispatch(
                AuthActions.LogoutActions.do()
              );
            }
            break;
        }
      });
  }

  public toggle() {
    this.sidebarService.toggle(true, 'left');
  }

  public onAction(item: NbMenuItem): void {
    if (HeaderMenu.Create === item.data) {
      this.store.dispatch(
        JobActions.CreateActions.reset()
      );
    }
    this.router.navigate([
      item.link
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
    ]).pipe(
      map(([user]) => {
        if (user) {
          return user.name;
        }
        return 'Loading...';
      })
    );
  }

  @HostListener('window:resize', ['$event'])
  public onWindowResize(event: any) {
    const screenWidth = event.target.innerWidth;
    this.breakpoints = screenWidth <= 576 ? 'sm' : 'md';
  }

  private switchLanguage(language: string): void {
    this.language = language;
    localStorage.setItem('language', language);
    this.translate.setDefaultLang(language);
  }

  public get languageTitle(): string {
    return this.languages.find((language) =>
      language.ariaRole === this.language)?.title || '';
  }

}
