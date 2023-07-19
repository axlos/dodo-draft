import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { NbStepperComponent } from "@nebular/theme";
import { filter, map, tap } from "rxjs/operators";
import { combineLatest, Observable } from "rxjs";

import { SetupProfile } from "../../enums/setup-profile.enum";
import { Profile } from "../../../../core/models/profile.model";
import { stepNavigationFeature } from "../../store/step-navigation/step-navigation.feature";
import { profileFeature } from "src/app/core/store/features/profile.feature";
import { authFeature } from "../../../../core/store/features/auth.feature";
import { StepNavigation } from "../../store/step-navigation/step-navigation.actions";
import { UIActions } from "../../../../core/store/actions/core.actions";
import * as ProfileActions from "src/app/core/store/actions/profile.actions";
import * as AuthActions from "../../../../core/store/actions/auth.actions";
import { AuthUser } from "../../../../core/interfaces/auth-user.interface";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { SuggestVariant } from "../../../../core/models/suggest-variant.model";
import * as ProfileFeature from "../../../../core/store/features/profile.feature";

@Component({
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements AfterViewInit {

  @ViewChild('stepper')
  public stepper: NbStepperComponent | null = null;

  public file: File | null = null;
  public loading$: Observable<boolean>;
  public saving$: Observable<boolean>;
  public suggesting$: Observable<boolean>;
  public savingVariant$: Observable<boolean>;
  public variants$: Observable<SuggestVariant[]>;
  public profile$: Observable<Profile | null>;
  public user$: Observable<AuthUser>;
  public newUpload: boolean = false;
  public SetupProfile = SetupProfile;

  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store,
    private router: Router,
    private translate: TranslateService
  ) {
    // Profile Selectors
    this.profile$ = this.store.select(profileFeature.selectProfile);
    this.saving$ = this.store.select(profileFeature.selectSaving);
    this.user$ = this.store.select(authFeature.selectUser);
    this.suggesting$ = this.store.select(ProfileFeature.selectSuggesting);
    this.variants$ = this.store.select(ProfileFeature.selectVariants);
    this.savingVariant$ = this.store.select(ProfileFeature.selectSavingVariant);

    // Loading, when it's uploading, loading the profile or the Setup profile is still uploading the file
    this.loading$ = combineLatest([
      this.store.select(profileFeature.selectUploading),
      this.store.select(profileFeature.selectLoading),
      this.store.select(authFeature.selectUser)
        .pipe(
          map((user) =>
            user !== null && SetupProfile.Uploading === user['setupProfile']
          )
        )
    ]).pipe(
      tap(([
        uploading,
        loadingProfile,
        // loadingUser,
        uploadingStatus
      ]) => {
        if (uploadingStatus) {
          // if (!loadingUser && uploadingStatus) {
          this.store.dispatch(
            UIActions.displaymessage({
              params: {
                message: translate.instant('profile.setup.extract-profile-progress'),
                title: translate.instant('profile.setup.extract-profile'),
                config: {
                  status: 'primary',
                  duration: 0,
                  preventDuplicates: true,
                  icon: {
                    icon: 'refresh-outline',
                    pack: 'eva'
                  }
                }
              }
            })
          )
        }
      }),
      map(([
          uploading,
          loadingProfile,
          // loadingUser,
          uploadingStatus
        ],) =>
          uploading || loadingProfile || uploadingStatus
        // uploading || loadingProfile || loadingUser || uploadingStatus
      )
    );
  }

  ngAfterViewInit() {
    this.user$.pipe(
      filter(user =>
        user !== null
      )
    ).subscribe((user) => {
      let index = 0;
      switch (user.setupProfile) {
        case SetupProfile.Verify:
          index = 1;
          break
        case SetupProfile.Verified:
          index = 2;
      }
      this.store.dispatch(
        StepNavigation.go({
          index
        })
      );
    });

    this.store.select(stepNavigationFeature.selectIndex)
      .pipe(
        filter(() =>
          this.stepper !== null
        )
      )
      .subscribe((index) => {
        // @ts-ignore
        this.stepper.selectedIndex = index;
        this.cdr.detectChanges();
      });

    // When profile is uploaded, go to next step
    const selectUploaded = this.store.select(profileFeature.selectUploaded);
    selectUploaded.pipe(
      filter((uploaded) =>
        uploaded === true
      ),
    ).subscribe(() => {
      this.store.dispatch(
        StepNavigation.go({
          // @ts-ignore
          index: this.stepper.selectedIndex + 1
        })
      );
      // @ts-ignore
      this.stepper.selectedIndex = 1;
    });
  }

  public fileSelected(file: File | null): void {
    this.file = file;
    this.newUpload = true;
  }

  public uploadFile(): void {
    if (this.file === null) {
      return;
    }

    this.newUpload = false;

    this.store.dispatch(
      UIActions.displaymessage({
        params: {
          message: this.translate.instant('profile.setup.extract-profile-wait'),
          title: this.translate.instant('profile.setup.extract-profile'),
          config: {
            duration: 0,
            status: 'primary',
            preventDuplicates: true,
            icon: {
              icon: 'settings-outline',
              pack: 'eva'
            }
          }
        }
      })
    );

    this.store.dispatch(
      ProfileActions.UploadActions.do({
        file: (
          this.file as File
        )
      })
    );
  }

  public verify(): void {
    this.store.dispatch(
      AuthActions.UpdateUserActions.verify()
    );
  }

  public saveProfile(profile: Partial<Profile>): void {
    this.store.dispatch(
      ProfileActions.SaveActions.do({
        profile
      })
    );
  }

  public get isInVerification(): Observable<boolean> {
    return this.user$.pipe(
      map((user) =>
        user !== null && SetupProfile.Verify === user['setupProfile']
      )
    );
  }

  public startCreating(): void {
    this.router.navigate(['/proposal/create']);
  }

  public suggestVariant(content: string): void {
    this.store.dispatch(
      ProfileActions.SuggestVariantsActions.do({
        content
      })
    );
  }

  public cancelVariants(): void {
    this.store.dispatch(
      ProfileActions.SuggestVariantsActions.cancel()
    );
  }

  public approveVariant(content: string): void {
    this.store.dispatch(
      ProfileActions.SuggestVariantsActions.approve({
        content
      })
    );
  }
}
