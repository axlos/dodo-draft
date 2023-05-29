import { Component, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { NbStepperComponent, NbToastrService } from "@nebular/theme";
import { filter } from "rxjs/operators";

import * as fromCoreActions from "src/app/core/store/core.actions";
import * as fromCoreFeature from "src/app/core/store/core.feature";
import { Observable, of } from "rxjs";

@Component({
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {

  @ViewChild('stepper')
  public stepper: NbStepperComponent | null = null;

  public file: File | null = null;
  public uploading: boolean = false

  constructor(
    private toastrService: NbToastrService,
    private store: Store
  ) {
    this.store.select(fromCoreFeature.selectUploading)
      .subscribe((uploading) =>
        this.uploading = uploading
    );

    const getUploaded = this.store.select(fromCoreFeature.selectUploaded);
    getUploaded.pipe(
      filter((uploaded) =>
        uploaded === true
      ),
    ).subscribe(() => {
      if (this.stepper !== null) {
        this.stepper.next();
      }
    });
    const getFileError = this.store.select(fromCoreFeature.selectUploadedError);
    getFileError.pipe(
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
        fromCoreActions.uploadFile({
          file: (this.file as File)
        })
      );
    }
  }
}
