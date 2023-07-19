import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Job } from "../../models/job.model";
import { Profile } from "../../../../core/models/profile.model";
import { wordLimitValidator } from "../../../../shared/validators/word-limit.validator";

@Component({
  selector: 'app-proposal-form',
  templateUrl: './proposal-form.component.html',
  styleUrls: ['./proposal-form.component.scss']
})
export class ProposalFormComponent implements OnChanges {

  @Input()
  public loading: boolean = false;
  @Input()
  public displayCancel: boolean = false;
  @Output()
  public save = new EventEmitter<{
    id: string | null,
    job: Job
  }>();
  @Output()
  public cancel = new EventEmitter<void>();

  public readonly titleWordLimit: number = 20;
  public readonly detailsWordLimit: number = 300;
  public proposalForm: FormGroup;
  public languageName: string;

  private id: string | null = null;
  private _job: Job | null = null;
  private _profile: Profile | null = null;

  constructor(
    private fb: FormBuilder
  ) {

    this.proposalForm = this.fb.group({
      title: [
        null,
        [Validators.required, wordLimitValidator(this.titleWordLimit)]
      ],
      details: [
        null, [
          Validators.required, wordLimitValidator(this.detailsWordLimit)
        ]
      ],
      additionalContent: [null],
      experiences: [null],
      educations: [null],
      certifications: [null],
      languages: [null]
    });
  }

  @Input()
  set job(job: Job) {
    if (job) {
      this._job = job;
      this.id = job._id;
      this.proposalForm.patchValue({
        title: job.title,
        details: job.details,
        additionalContent: job.additionalContent,
        experiences: job.experiences,
        educations: job.educations,
        certifications: job.certifications,
        languages: job.languages
      });
    }
  }

  get job() {
    return this._job;
  }

  @Input()
  set profile(profile: Profile) {
    if (profile) {
      this._profile = profile;
      this.languageName = this.getLanguageName(profile.language ?? 'en');
      if (profile.experiences && profile.experiences.length === 0) {
        this.proposalForm.get('experiences').disable();
      }
      if (profile.educations && profile.educations.length === 0) {
        this.proposalForm.get('educations').disable();
      }
      if (profile.certifications && profile.certifications.length === 0) {
        this.proposalForm.get('certifications').disable();
      }
      if (profile.languages && profile.languages.length === 0) {
        this.proposalForm.get('languages').disable();
      }
    }
  }

  ngOnChanges() {
    if (this._profile) {
      if (this._profile.experiences && this._profile.experiences.length === 0) {
        this.proposalForm.get('experiences').setValue(false);
      }
      if (this._profile.educations && this._profile.educations.length === 0) {
        this.proposalForm.get('educations').setValue(false);
      }
      if (this._profile.certifications && this._profile.certifications.length === 0) {
        this.proposalForm.get('certifications').setValue(false);
      }
      if (this._profile.languages && this._profile.languages.length === 0) {
        this.proposalForm.get('languages').setValue(false);
      }
    }
    if (this.loading) {
      this.proposalForm.disable();
    }
  }

  public createProposal(): void {
    this.save.emit({
      id: this.id,
      job: this.proposalForm.value
    });
  }

  private getLanguageName(code: string): string {
    switch (code) {
      case "es":
        return "Español";
      default:
        return "English";
    }
  }

}

