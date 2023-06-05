import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbDialogRef } from "@nebular/theme";

@Component({
  templateUrl: './certification-dialog.component.html'
})
export class CertificationDialogComponent {

  public formCertification: FormGroup;

  constructor(
    private fb: FormBuilder,
    protected dialogRef: NbDialogRef<CertificationDialogComponent>
  ) {
    this.formCertification = this.fb.group({
      certification: ['certification', Validators.required]
    });
  }

  public save(): void {
    if (this.formCertification.invalid) {
      return;
    }
    this.dialogRef.close(this.formCertification.get('certification')?.value);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
