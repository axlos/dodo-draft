import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { Profile } from "../../../../../core/models/profile.model";
import { Job } from "../../../models/job.model";
import { jobFeature } from "../../../store/job/job.feature";
import { profileFeature } from "../../../../../core/store/features/profile.feature";
import * as JobActions from "../../../store/job/job.actions";

@Component({
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.scss']
})
export class CreateProposalComponent implements OnInit {

  public profile$: Observable<Profile | null>;
  public loading$: Observable<boolean>;
  public saving$: Observable<boolean>;
  public reset$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.saving$ = this.store.select(jobFeature.selectSaving);
    this.loading$ = this.store.select(jobFeature.selectLoading);
    this.profile$ = this.store.select(profileFeature.selectProfile);
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

}
