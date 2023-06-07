import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { Job } from "../../models/job.model";
import { Profile } from "../../../../core/models/profile.model";
import * as JobActions from "../../store/job/job.actions";
import { jobFeature } from "../../store/job/job.feature";
import { profileFeature } from "../../../../core/store/features/profile.feature";
import { Proposal } from "../../models/proposal.model";

@Component({
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent implements OnInit {

  public profile$: Observable<Profile | null>;
  public job$: Observable<Job | null>;
  public loading$: Observable<boolean>;
  public saving$: Observable<boolean>;
  public reset$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.saving$ = this.store.select(jobFeature.selectSaving);
    this.loading$ = this.store.select(jobFeature.selectLoading);
    this.job$ = this.store.select(jobFeature.selectJob);
    this.reset$ = this.store.select(jobFeature.selectReset);
    this.profile$ = this.store.select(profileFeature.selectProfile);

    // get angular parameter from router
    this.route.paramMap
      .pipe(
        filter(params =>
          params.has('id')
        )
      )
      .subscribe(params =>
        this.store.dispatch(
          JobActions.LoadActions.do({
            id: params.get('id') as string
          })
        )
      );
  }

  ngOnInit(): void {
  }

  public saveProposal(id: string | null, job: Job): void {
    if (id) {
      this.store.dispatch(
        JobActions.UpdateActions.do({
          id: id,
          job
        })
      );
    } else {
      this.store.dispatch(
        JobActions.CreateActions.do({
          job
        })
      );
    }
  }

  public deleteProposal(job: Job, proposal: Proposal): void {
    // dispatch delete proposal action
    this.store.dispatch(
      JobActions.DeleteProposalActions.do({
        jobId: job._id,
        proposalId: proposal._id
      })
    );
  }
}
