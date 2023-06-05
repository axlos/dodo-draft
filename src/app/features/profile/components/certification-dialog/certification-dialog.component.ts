import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbDialogRef } from "@nebular/theme";

@Component({
  templateUrl: './certification-dialog.component.html'
})
export class CertificationDialogComponent implements OnInit {

  public certification: string | null = null;
  public index: number | null = null;
  public formCertification: FormGroup;

  constructor(
    private fb: FormBuilder,
    protected dialogRef: NbDialogRef<CertificationDialogComponent>
  ) {
    this.formCertification = this.fb.group({
      certification: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.certification) {
      this.formCertification.patchValue({
        certification: this.certification
      });
    }
  }

  public save(): void {
    if (this.formCertification.invalid) {
      return;
    }
    this.dialogRef.close({
      certification: this.formCertification.get('certification')?.value,
      index: this.index
    });
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
