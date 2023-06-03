import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Job } from "../../models/job.model";
import * as JobActions from "../../store/job/job.actions";
import { jobFeature } from "../../store/job/job.feature";

@Component({
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent {

  public job$: Observable<Job | null>;
  public loading$: Observable<boolean>;
  public saving$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.saving$ = this.store.select(jobFeature.selectSaving);
    this.loading$ = this.store.select(jobFeature.selectLoading);
    this.job$ = this.store.select(jobFeature.selectJob);

    // get angular parameter from router
    this.route.paramMap
      .pipe(
        filter(params =>
          params.has('id')
        )
      )
      .subscribe(params => {
        this.store.dispatch(
          JobActions.LoadActions.do({
            id: params.get('id') as string
          })
        );
      });
  }

  public saveProposal(id: string | null, job: Job): void {
    if (id) {
      this.store.dispatch(JobActions.UpdateActions.do({
        id: id,
        job
      }));
    } else {
      this.store.dispatch(JobActions.CreateActions.do({
        job
      }));
    }
  }
}
