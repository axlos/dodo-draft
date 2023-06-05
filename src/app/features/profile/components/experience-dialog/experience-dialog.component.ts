import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbDialogRef } from "@nebular/theme";
import { Experience } from "../../models/experience.model";

@Component({
  templateUrl: './experience-dialog.component.html'
})
export class ExperienceDialogComponent implements OnInit {

  public experience: Experience | null = null
  public index: number | null = null;
  public formExperience: FormGroup;

  constructor(
    private fb: FormBuilder,
    protected dialogRef: NbDialogRef<ExperienceDialogComponent>
  ) {
    this.formExperience = this.fb.group({
      position: [null, Validators.required],
      company: [null, Validators.required],
      description: [null]
    });
  }

  ngOnInit(): void {
    if (this.experience) {
      this.formExperience.patchValue(this.experience);
    }
  }

  public save(): void {
    if (this.formExperience.invalid) {
      return;
    }
    this.dialogRef.close({
      experience: this.formExperience.value,
      index: this.index
    });
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
