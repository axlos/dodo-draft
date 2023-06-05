import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbDialogRef } from "@nebular/theme";
import { Language } from "../../models/language.model";

@Component({
  templateUrl: './language-dialog.component.html'
})
export class LanguageDialogComponent implements OnInit {

  public language: Language | null = null;
  public index: number | null = null;
  public formLanguage: FormGroup;

  constructor(
    private fb: FormBuilder,
    protected dialogRef: NbDialogRef<LanguageDialogComponent>
  ) {
    this.formLanguage = this.fb.group({
      language: [null, Validators.required],
      level: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.language) {
      this.formLanguage.patchValue(this.language);
    }
  }

  public save(): void {
    if (this.formLanguage.invalid) {
      return;
    }
    this.dialogRef.close({
      language: this.formLanguage.value,
      index: this.index
    });
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
