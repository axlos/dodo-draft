import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbDialogRef } from "@nebular/theme";

@Component({
  templateUrl: './education-dialog.component.html'
})
export class EducationDialogComponent {

  public formEducation: FormGroup;

  constructor(
    private fb: FormBuilder,
    protected dialogRef: NbDialogRef<EducationDialogComponent>
  ) {
    this.formEducation = this.fb.group({
      degree: ['degree', Validators.required],
      institution: ['institution', Validators.required],
    });
  }

  public save(): void {
    if (this.formEducation.invalid) {
      return;
    }
    this.dialogRef.close(this.formEducation.value);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
