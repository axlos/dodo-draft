import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Job } from "../../models/job.model";

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
  public job: Job | null = null;
  @Input()
  public loading: boolean = false;

  public proposalForm: FormGroup;
  private id: string | null = null;

  constructor(
    private fb: FormBuilder
  ) {

    this.proposalForm = this.fb.group({
      title: ['', Validators.required],
      details: ['', Validators.required],
      question: [''],
      experiences: [null],
      educations: [null],
      certifications: [null],
      languages: [null]
    });
  }

  ngOnInit() {
    // TODO: Disable form on loading  (DONE)

  }

  ngOnChanges() {
    if (this.job) {
      this.id = this.job._id;
      this.proposalForm.patchValue({
        title: this.job.title,
        details: this.job.details,
        question: this.job.question,
        experiences: this.job.experiences,
        educations: this.job.educations,
        certifications: this.job.certifications,
        languages: this.job.languages
      });
    } else {
      this.id = null;
      this.proposalForm.reset();
    }
    if (this.loading) {
      this.proposalForm.disable();
    } else {
      this.proposalForm.enable();
    }
  }

  public createProposal(): void {
    this.save.emit({
      id: this.id,
      job: this.proposalForm.value
    });
  }
}
