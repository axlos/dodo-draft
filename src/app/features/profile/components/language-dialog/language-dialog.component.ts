import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbDialogRef } from "@nebular/theme";

@Component({
  templateUrl: './language-dialog.component.html'
})
export class LanguageDialogComponent {

  public formLanguage: FormGroup;

  constructor(
    private fb: FormBuilder,
    protected dialogRef: NbDialogRef<LanguageDialogComponent>
  ) {
    this.formLanguage = this.fb.group({
      language: ['language', Validators.required],
      level: ['full professional', Validators.required]
    });
  }

  public save(): void {
    if (this.formLanguage.invalid) {
      return;
    }
    this.dialogRef.close(this.formLanguage.value);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
