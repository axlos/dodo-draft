import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Job } from "../../models/job.model";
import { Profile } from "../../../../core/models/profile.model";

@Component({
  selector: 'app-proposal-form',
  templateUrl: './proposal-form.component.html',
  styleUrls: ['./proposal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProposalFormComponent implements OnInit, OnChanges {

  @Output()
  public save = new EventEmitter<{
    id: string | null,
    job: Job
  }>();
  @Input()
  public loading: boolean = false;

  public proposalForm: FormGroup;
  private id: string | null = null;
  private _job: Job | null = null;
  private _profile: Profile | null = null;

  constructor(
    private fb: FormBuilder
  ) {

    this.proposalForm = this.fb.group({
      title: ['', Validators.required],
      details: ['', Validators.required],
      additionalContent: [''],
      experiences: [null],
      educations: [null],
      certifications: [null],
      languages: [null]
    });
  }

  ngOnInit() {
  }

  @Input()
  set job (job: Job) {
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
  set reset(reset: boolean) {
    if (reset) {
      this.id = null;
      this.proposalForm.reset();
    }
  }


  @Input()
  set profile(profile: Profile) {
    if (profile) {
      this._profile = profile;
      if (profile.experiences.length === 0) {
        this.proposalForm.get('experiences').disable();
      }
      if (profile.educations.length === 0) {
        this.proposalForm.get('educations').disable();
      }
      if (profile.certifications.length === 0) {
        this.proposalForm.get('certifications').disable();
      }
      if (profile.languages.length === 0) {
        this.proposalForm.get('languages').disable();
      }
    }
  }

  ngOnChanges() {
    if (this._profile && this._job) {
      if (this._profile.experiences.length === 0) {
        this.proposalForm.get('experiences').setValue(false);
      }
      if (this._profile.educations.length === 0) {
        this.proposalForm.get('educations').setValue(false);
      }
      if (this._profile.certifications.length === 0) {
        this.proposalForm.get('certifications').setValue(false);
      }
      if (this._profile.languages.length === 0) {
        this.proposalForm.get('languages').setValue(false);
      }
    }
  }

  public createProposal(): void {
    this.save.emit({
      id: this.id,
      job: this.proposalForm.value
    });
  }
}

