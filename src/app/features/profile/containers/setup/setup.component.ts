import { Component, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { NbStepperComponent, NbToastrService } from "@nebular/theme";
import { filter } from "rxjs/operators";
import { Observable } from "rxjs";

import { Profile } from "../../models/profile.model";
import * as ProfileFeature from "src/app/features/profile/store/profile.feature";
import * as ProfileActions from "src/app/features/profile/store/profile.actions";

@Component({
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent {

  @ViewChild('stepper')
  public stepper: NbStepperComponent | null = null;

  public file: File | null = null;
  public uploading: boolean = false
  public profile$: Observable<Profile | null>;

  constructor(
    private toastrService: NbToastrService,
    private store: Store
  ) {
    // File Selectors
    this.store.select(ProfileFeature.selectUploading)
      .subscribe((uploading) =>
        this.uploading = uploading
      );

    const selectUploaded = this.store.select(ProfileFeature.selectUploaded);
    selectUploaded.pipe(
      filter((uploaded) =>
        uploaded === true
      ),
    ).subscribe(() => {
      if (this.stepper !== null) {
        this.stepper.next();
      }
    });
    const selectUploadedError = this.store.select(ProfileFeature.selectUploadedError);
    selectUploadedError.pipe(
      filter((error) =>
        error !== null
      ),
    ).subscribe((error) => {
      this.toastrService.warning(error, 'Profile Upload');
    });

    // Profile Selectors
    this.profile$ = this.store.select(ProfileFeature.selectProfile);

    // TODO: Remove
    this.store.dispatch(
      ProfileActions.LoadActions.do()
    );

    this.profile$.subscribe((profile) => {
      console.log(profile);
    });

    const selectLoaded = this.store.select(ProfileFeature.selectLoaded);
    selectLoaded.pipe(
      filter((loaded) =>
        loaded === true
      ),
    ).subscribe(() => {
    });
  }

  public fileSelected(file: File | null): void {
    this.file = file;
  }

  public uploadFile(): void {
    if (this.file !== null) {
      this.store.dispatch(
        ProfileActions.UploadActions.do({
          file: (this.file as File)
        })
      );
    }
  }

}
