import { Component, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { NbStepperComponent, NbToastrService } from "@nebular/theme";
import { filter, map, skip } from "rxjs/operators";
import { combineLatest, Observable } from "rxjs";

import { Profile } from "../../models/profile.model";
import * as ProfileFeature from "src/app/features/profile/store/profile/profile.feature";
import * as ProfileActions from "src/app/features/profile/store/profile/profile.actions";
import * as UserActions from "../../../../core/store/actions/user.actions";
import { userFeature } from "../../../../core/store/features/user.feature";
import { stepNavigationFeature } from "../../store/step-navigation/step-navigation.feature";
import { SetupProfile } from "../../enums/setup-profile.enum";
import { User } from "../../../../core/models/user.model";
import { StepNavigation } from "../../store/step-navigation/step-navigation.actions";

@Component({
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  @ViewChild('stepper')
  public stepper: NbStepperComponent | null = null;

  public file: File | null = null;
  public loading$: Observable<boolean>;
  public profile$: Observable<Profile | null>;

  constructor(
    private toastrService: NbToastrService,
    private store: Store
  ) {
    // Profile Selectors
    this.profile$ = this.store.select(ProfileFeature.selectProfile);

    // Loading, when it's uploading, loading the profile or the Setup profile is still uploading the file
    this.loading$ = combineLatest([
      this.store.select(ProfileFeature.selectUploading),
      this.store.select(ProfileFeature.selectLoading),
      this.store.select(userFeature.selectUser)
        .pipe(
          map((user) =>
            user !== null && SetupProfile.Uploading === user.setupProfile
          )
        )
    ]).pipe(
      map(([uploading, loadingProfile, uploadingStatus]) => {
        if (uploadingStatus) {
          this.toastrService.default('Uploading profile', 'Refresh the page in a couple of seconds');
        }
        return uploading || loadingProfile || uploadingStatus;
      })
    );
  }

  ngOnInit(): void {
    // Load User to verify the setup wizard step
    this.store.dispatch(UserActions.LoadActions.do());

    // Control the step navigation based on StepNavigation Store
    this.store.select(stepNavigationFeature.selectIndex)
      .pipe(
        skip(1)
      )
      .subscribe((index) => {
        if (this.stepper !== null) {
          this.stepper.selectedIndex = index;
        }
      });

    // When profile is uploaded, go to next step
    const selectUploaded = this.store.select(ProfileFeature.selectUploaded);
    selectUploaded.pipe(
      filter((uploaded) =>
        uploaded === true
      ),
    ).subscribe(() =>
      this.store.dispatch(
        StepNavigation.go({
          index: (
            this.stepper !== null
          ) ? this.stepper.selectedIndex + 1 : 0
        })
      )
    );

    // Display error message if profile upload fails
    const selectUploadedError = this.store.select(ProfileFeature.selectUploadedError);
    selectUploadedError.pipe(
      filter((error) =>
        error !== null
      ),
    ).subscribe((error) => {
      this.toastrService.warning(error, 'Profile Upload');
    });
  }

  public fileSelected(file: File | null): void {
    this.file = file;
  }

  public uploadFile(): void {
    if (this.file !== null) {
      this.store.dispatch(
        ProfileActions.UploadActions.do({
          file: (
            this.file as File
          )
        })
      );
    }
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
}
