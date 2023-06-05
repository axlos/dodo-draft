import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbDialogRef } from "@nebular/theme";
import { Education } from "../../models/education.model";

@Component({
  templateUrl: './education-dialog.component.html'
})
export class EducationDialogComponent implements OnInit {

  public education: Education | null = null;
  public index: number | null = null;
  public formEducation: FormGroup;

  constructor(
    private fb: FormBuilder,
    protected dialogRef: NbDialogRef<EducationDialogComponent>
  ) {
    this.formEducation = this.fb.group({
      degree: [null, Validators.required],
      institution: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.education) {
      this.formEducation.patchValue(this.education);
    }
  }

  public save(): void {
    if (this.formEducation.invalid) {
      return;
    }
    this.dialogRef.close({
      education: this.formEducation.value,
      index: this.index
    });
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
