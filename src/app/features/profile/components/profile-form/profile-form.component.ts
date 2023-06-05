import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";
import { Profile } from "../../models/profile.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProfileFormControls } from "../../enums/profile-form-controls.enum";
import { CrudButtonsConfig } from "../../../../shared/components/crud-buttons/crud-buttons-config";
import { NbDialogService } from "@nebular/theme";
import { ExperienceDialogComponent } from "../experience-dialog/experience-dialog.component";
import { Experience } from "../../models/experience.model";
import { LanguageDialogComponent } from "../language-dialog/language-dialog.component";
import { CertificationDialogComponent } from "../certification-dialog/certification-dialog.component";
import { EducationDialogComponent } from "../education-dialog/education-dialog.component";
import { filter } from "rxjs/operators";
import { Language } from "../../models/language.model";
import { Education } from "../../models/education.model";

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnChanges {

  @Input()
  public profile: Profile | null = null;
  @Input()
  public loading: boolean = false;
  @Input()
  public saving: boolean = false;
  @Output()
  public save = new EventEmitter<Partial<Profile>>();

  public profileForm: FormGroup;
  public ProfileFormControls = ProfileFormControls;
  // Full Name config
  public fullNameCrudButtonsConfig: CrudButtonsConfig = {
    edit: true,
    delete: false,
  };
  public editFullName: boolean = false;
  // Summary config
  public summaryCrudButtonsConfig: CrudButtonsConfig = {
    edit: true,
    delete: false,
  };
  public editSummary: boolean = false;
  // Headline config
  public headlineCrudButtonsConfig: CrudButtonsConfig = {
    edit: true,
    delete: false
  };
  public editHeadline: boolean = false;
  // Experience config
  public experiencesCrudButtons: { experience: Experience, config: CrudButtonsConfig }[] = [];

  constructor(
    private dialogService: NbDialogService
  ) {
    this.profileForm = new FormGroup({});

    this.profileForm.addControl(
      this.ProfileFormControls.FullName, new FormControl('', Validators.required)
    );
    this.profileForm.addControl(
      this.ProfileFormControls.Headline, new FormControl('', Validators.required)
    );
    this.profileForm.addControl(
      this.ProfileFormControls.Summary, new FormControl('', Validators.required)
    );
  }

  ngOnChanges() {
    if (this.profile) {
      const pathValues = {} as any;
      pathValues[this.ProfileFormControls.FullName] = this.profile.fullName;
      pathValues[this.ProfileFormControls.Summary] = this.profile.summary;
      pathValues[this.ProfileFormControls.Headline] = this.profile.headline;
      this.profileForm.patchValue(pathValues);

      this.experiencesCrudButtons = this.profile.experiences
        .map((experience: Experience) => (
          {
            experience,
            config: {
              edit: true,
              delete: true
            }
          }
        ));
    }
  }

  public onSave(attr: string): void {
    switch (attr) {
      case this.ProfileFormControls.FullName:
        this.save.emit({
          fullName: this.profileForm.get(this.ProfileFormControls.FullName)?.value
        });
        this.editFullName = false;
        break;
      case this.ProfileFormControls.Summary:
        this.save.emit({
          summary: this.profileForm.get(this.ProfileFormControls.Summary)?.value
        });
        this.editSummary = false;
        break;
      case this.ProfileFormControls.Headline:
        this.save.emit({
          headline: this.profileForm.get(this.ProfileFormControls.Headline)?.value
        });
        this.editHeadline = false;
        break;
    }
  }

  public openExperienceDialog(experience?: Experience, index?: number): void {
    this.dialogService.open(ExperienceDialogComponent, {
      context: { experience, index }
    }).onClose
      .pipe(
        filter((res: { experience: Experience, index: number }) =>
          !!res
        )
      )
      .subscribe((res: { experience: Experience, index: number }) => {
        const profile = this.profile as Profile;
        if (index !== undefined) {
          // Replace experience
          this.save.emit({
            experiences: [
              ...profile.experiences.map((e, index) =>
                index === res.index ? res.experience : e
              )
            ]
          });
        } else {
          // Add experience
          this.save.emit({
            experiences: [
              ...profile.experiences || [],
              res.experience
            ]
          });
        }
      });
  }

  public deleteExperience(index: number): void {
    const profile = this.profile as Profile;
    this.save.emit({
      experiences: [
        ...profile.experiences.filter((e, i) =>
          i !== index
        )
      ]
    });
  }

  public editExperience(
    experienceCrud: { experience: Experience; config: CrudButtonsConfig },
    index: number
  ): void {
    this.openExperienceDialog(experienceCrud.experience, index);
  }

  public addLanguage(): void {
    this.dialogService.open(LanguageDialogComponent).onClose
      .pipe(
        filter((language: Language) =>
          !!language
        )
      )
      .subscribe((language: Language) => {
        const profile = this.profile as Profile;
        this.save.emit({
          languages: [
            ...profile.languages || [],
            language
          ]
        });
      })
  }

  public addCertification(): void {
    this.dialogService.open(CertificationDialogComponent).onClose
      .pipe(
        filter((certification: string) =>
          !!certification && certification.trim().length > 0
        )
      )
      .subscribe((certification: string) => {
        const profile = this.profile as Profile;
        this.save.emit({
          certifications: [
            ...profile.certifications || [],
            certification
          ]
        });
      });
  }

  public addEducation(): void {
    this.dialogService.open(EducationDialogComponent).onClose
      .pipe(
        filter((education: Education) =>
          !!education
        )
      )
      .subscribe((education: Education) => {
        const profile = this.profile as Profile;
        this.save.emit({
          educations: [
            ...profile.educations || [],
            education
          ]
        });
      });
  }


}
