import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { NbStepperComponent } from "@nebular/theme";
import { filter, map, tap } from "rxjs/operators";
import { combineLatest, Observable } from "rxjs";

import { Profile } from "../../models/profile.model";
import * as ProfileFeature from "src/app/features/profile/store/profile/profile.feature";
import * as UserFeature from "src/app/core/store/features/user.feature";
import * as ProfileActions from "src/app/features/profile/store/profile/profile.actions";
import * as UserActions from "../../../../core/store/actions/user.actions";
import { userFeature } from "../../../../core/store/features/user.feature";
import { stepNavigationFeature } from "../../store/step-navigation/step-navigation.feature";
import { SetupProfile } from "../../enums/setup-profile.enum";
import { User } from "../../../../core/models/user.model";
import { StepNavigation } from "../../store/step-navigation/step-navigation.actions";
import { UIActions } from "../../../../core/store/actions/core.actions";

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

  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store
  ) {
    // Profile Selectors
    this.profile$ = this.store.select(ProfileFeature.selectProfile);
    this.saving$ = this.store.select(ProfileFeature.selectSaving);

    // Loading, when it's uploading, loading the profile or the Setup profile is still uploading the file
    this.loading$ = combineLatest([
      this.store.select(ProfileFeature.selectUploading),
      this.store.select(ProfileFeature.selectLoading),
      this.store.select(UserFeature.selectLoading),
      this.store.select(userFeature.selectUser)
        .pipe(
          map((user) =>
            user !== null && SetupProfile.Uploading === user.setupProfile
          )
        )
    ]).pipe(
      tap(([
        uploading,
        loadingProfile,
        loadingUser,
        uploadingStatus
      ]) => {
        if (!loadingUser && uploadingStatus) {
          this.store.dispatch(
            UIActions.displaymessage({
              params: {
                message: 'This process may take some time. Please consider refreshing the page in a few moments.',
                title: 'Uploading profile',
                config: {
                  status: 'basic',
                  duration: 5000,
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
          loadingUser,
          uploadingStatus
        ],) =>
          uploading || loadingProfile || loadingUser || uploadingStatus
      )
    );
  }

  ngAfterViewInit() {
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
    const selectUploaded = this.store.select(ProfileFeature.selectUploaded);
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

    // Display error message if profile upload fails
    const selectUploadedError = this.store.select(ProfileFeature.selectUploadedError);
    selectUploadedError.pipe(
      filter((error) =>
        error !== null
      ),
    ).subscribe((error) =>
      this.store.dispatch(
        UIActions.displaymessage({
          params: {
            message: 'An error occurred while uploading your profile. Please try again later.',
            title: 'Profile Upload',
            config: {
              status: 'warning',
            }
          }
        })
      )
    );
  }

  public fileSelected(file: File | null): void {
    this.file = file;
  }

  public uploadFile(): void {
    if (this.file === null) {
      return;
    }

    this.store.dispatch(
      UIActions.displaymessage({
        params: {
          message: 'The process of extracting your profile may require some time. Please be patient!',
          title: 'Extracting profile',
          config: {
            duration: 5000,
            status: 'primary',
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
      UserActions.UpdateActions.do({
        user: {
          setupProfile: SetupProfile.Verified
        } as User
      })
    );
  }

  public saveProfile(profile: Partial<Profile>): void {
    this.store.dispatch(
      ProfileActions.SaveActions.do({
        profile
      })
    );
  }

}
