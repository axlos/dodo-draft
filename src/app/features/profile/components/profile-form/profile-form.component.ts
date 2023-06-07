import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";
import { NbDialogService, NbTagComponent, NbTagInputAddEvent } from "@nebular/theme";
import { filter, tap } from "rxjs/operators";
import { Profile } from "../../../../core/models/profile.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProfileFormControls } from "../../enums/profile-form-controls.enum";
import { CrudButtonsConfig } from "../../../../shared/components/crud-buttons/crud-buttons-config";
import { ExperienceDialogComponent } from "../experience-dialog/experience-dialog.component";
import { Experience } from "../../models/experience.model";
import { LanguageDialogComponent } from "../language-dialog/language-dialog.component";
import { EducationDialogComponent } from "../education-dialog/education-dialog.component";
import { Language } from "../../models/language.model";
import { Education } from "../../models/education.model";
import { CertificationDialogComponent } from "../certification-dialog/certification-dialog.component";

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  // Summary config
  public skillsCrudButtonsConfig: CrudButtonsConfig = {
    edit: true,
    delete: false,
  };
  public currentSkills: string[] = [];
  public editSkills: boolean = false;
  // Headline config
  public headlineCrudButtonsConfig: CrudButtonsConfig = {
    edit: true,
    delete: false
  };
  public editHeadline: boolean = false;
  // Experience config
  public experiencesCrudButtons: {
    experience: Experience,
    config: CrudButtonsConfig,
    reset: boolean
  }[] = [];
  // Language config
  public languagesCrudButtons: {
    language: Language,
    config: CrudButtonsConfig,
    reset: boolean
  }[] = [];
  // Language config
  public certificationsCrudButtons: {
    certification: string,
    config: CrudButtonsConfig,
    reset: boolean
  }[] = [];
  // Education config
  public educationsCrudButtons: {
    education: Education,
    config: CrudButtonsConfig,
    reset: boolean
  }[] = [];

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

      this.currentSkills = this.profile.skills || [];
      this.experiencesCrudButtons = (
        this.profile.experiences || []
      ).map((experience: Experience) => (
        {
          experience,
          reset: false,
          config: {
            edit: true,
            delete: true
          }
        }
      ));
      this.languagesCrudButtons = (
        this.profile.languages || []
      ).map((language: Language) => (
        {
          language,
          reset: false,
          config: {
            edit: true,
            delete: true
          }
        }
      ));
      this.certificationsCrudButtons = (
        this.profile.certifications || []
      ).map((certification: string) => (
        {
          certification,
          reset: false,
          config: {
            edit: true,
            delete: true
          }
        }
      ));
      this.educationsCrudButtons = (
        this.profile.educations || []
      ).map((education: Education) => (
        {
          education,
          reset: false,
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
      case this.ProfileFormControls.Skills:
        this.save.emit({
          skills: this.currentSkills
        });
        this.editSkills = false;
        break;
    }
  }

  public openExperienceDialog(
    experienceCrud?: { experience: Experience; config: CrudButtonsConfig, reset: boolean },
    index?: number
  ): void {
    this.dialogService.open(ExperienceDialogComponent, {
      context: {
        experience: experienceCrud?.experience,
        index
      }
    }).onClose
      .pipe(
        tap(() => {
          if (experienceCrud) {
            experienceCrud.reset = true;
          }
        }),
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
    experienceCrud: { experience: Experience; config: CrudButtonsConfig, reset: boolean },
    index: number
  ): void {
    experienceCrud.reset = false;
    this.openExperienceDialog(experienceCrud, index);
  }

  public openLanguageDialog(
    languageCrud?: { language: Language; config: CrudButtonsConfig, reset: boolean },
    index?: number
  ): void {

    this.dialogService.open(LanguageDialogComponent, {
      context: {
        language: languageCrud?.language,
        index
      }
    }).onClose
      .pipe(
        tap(() => {
          if (languageCrud) {
            languageCrud.reset = true;
          }
        }),
        filter((res: { language: Language, index: number }) =>
          !!res
        )
      )
      .subscribe((res: { language: Language, index: number }) => {
        const profile = this.profile as Profile;
        if (index !== undefined) {
          // Replace language
          this.save.emit({
            languages: [
              ...profile.languages.map((l, index) =>
                index === res.index ? res.language : l
              )
            ]
          });
        } else {
          // Add language
          this.save.emit({
            languages: [
              ...profile.languages || [],
              res.language
            ]
          });
        }
      })
  }

  public editLanguage(
    languageCrud: { language: Language; config: CrudButtonsConfig, reset: boolean },
    index: number
  ): void {
    languageCrud.reset = false;
    this.openLanguageDialog(languageCrud, index);
  }

  deleteLanguage(index: number) {
    const profile = this.profile as Profile;
    this.save.emit({
      languages: [
        ...profile.languages.filter((e, i) =>
          i !== index
        )
      ]
    });
  }

  public openCertificationDialog(
    certificationCrud?: { certification: string; config: CrudButtonsConfig, reset: boolean },
    index?: number
  ): void {

    this.dialogService.open(CertificationDialogComponent, {
      context: {
        certification: certificationCrud?.certification,
        index
      }
    }).onClose
      .pipe(
        tap(() => {
          if (certificationCrud) {
            certificationCrud.reset = true;
          }
        }),
        filter((res: { certification: string, index: number }) =>
          !!res
        )
      )
      .subscribe((res: { certification: string, index: number }) => {
        const profile = this.profile as Profile;
        if (index !== undefined) {
          // Replace certifications
          this.save.emit({
            certifications: [
              ...profile.certifications.map((l, index) =>
                index === res.index ? res.certification : l
              )
            ]
          });
        } else {
          // Add certifications
          this.save.emit({
            certifications: [
              ...profile.certifications || [],
              res.certification
            ]
          });
        }
      })
  }


  public editCertification(
    certificationCrud: { certification: string; config: CrudButtonsConfig, reset: boolean },
    index: number
  ): void {
    certificationCrud.reset = false;
    this.openCertificationDialog(certificationCrud, index);
  }

  deleteCertification(i: number) {
    const profile = this.profile as Profile;
    this.save.emit({
      certifications: [
        ...profile.certifications.filter((e, index) =>
          index !== i
        )
      ]
    });
  }

  public openEducationDialog(
    educationCrud?: { education: Education; config: CrudButtonsConfig, reset: boolean },
    index?: number
  ): void {
    this.dialogService.open(EducationDialogComponent, {
      context: {
        education: educationCrud?.education,
        index
      }
    }).onClose
      .pipe(
        tap(() => {
          if (educationCrud) {
            educationCrud.reset = true;
          }
        }),
        filter((res: { education: Education, index: number }) =>
          !!res
        )
      )
      .subscribe((res: { education: Education, index: number }) => {
        const profile = this.profile as Profile;
        if (index !== undefined) {
          // Replace certifications
          this.save.emit({
            educations: [
              ...profile.educations.map((l, index) =>
                index === res.index ? res.education : l
              )
            ]
          });
        } else {
          // Add certifications
          this.save.emit({
            educations: [
              ...profile.educations || [],
              res.education
            ]
          });
        }
      });
  }

  public editEducation(
    educationCrud: { education: Education; config: CrudButtonsConfig; reset: boolean },
    index: number
  ): void {
    educationCrud.reset = false;
    this.openEducationDialog(educationCrud, index);
  }

  public deleteEducation(i: number): void {
    const profile = this.profile as Profile;
    this.save.emit({
      educations: [
        ...profile.educations.filter((e, index) =>
          index !== i
        )
      ]
    });
  }

  public deleteSkill(tagToRemove: NbTagComponent): void {
    this.currentSkills = this.currentSkills.filter((s) =>
      s !== tagToRemove.text
    );
  }

  public addSkill({ value, input }: NbTagInputAddEvent): void {
    if (value) {
      const profile = this.profile as Profile;
      this.currentSkills = [
        ...this.currentSkills,
        value
      ];
    }
    input.nativeElement.value = '';
  }

  public cancelSkills() : void {
    this.currentSkills = this.profile?.skills || [];
    this.editSkills = false;
  }
}
