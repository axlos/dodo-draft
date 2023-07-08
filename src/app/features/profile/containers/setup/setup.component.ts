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
  public profile$: Observable<Profile | null>;
  public user$: Observable<AuthUser>;
  public newUpload: boolean = false;
  public SetupProfile = SetupProfile;

  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store,
    private router: Router
  ) {
    // Profile Selectors
    this.profile$ = this.store.select(profileFeature.selectProfile);
    this.saving$ = this.store.select(profileFeature.selectSaving);
    this.user$ = this.store.select(authFeature.selectUser);

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
                message: 'The process is still in progress. Please consider refreshing the page between 30 seconds to 1 minute.',
                title: 'Extracting profile',
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
          message: 'The process of extracting your profile may require between 30 seconds to 1 minute.',
          title: 'Extracting profile',
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
}
