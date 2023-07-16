import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";

import { Profile } from "../../../../../core/models/profile.model";
import { Job } from "../../../models/job.model";
import { jobFeature } from "../../../store/job/job.feature";
import { profileFeature } from "../../../../../core/store/features/profile.feature";
import * as JobActions from "../../../store/job/job.actions";
import { filter } from "rxjs/operators";
import { UIActions } from "../../../../../core/store/actions/core.actions";
import { TranslateService } from "@ngx-translate/core";

@Component({
  templateUrl: './create-proposal.component.html',
  styleUrls: ['./create-proposal.component.scss']
})
export class CreateProposalComponent implements OnInit, OnDestroy {

  public profile$: Observable<Profile | null>;
  public loading$: Observable<boolean>;
  public saving$: Observable<boolean>;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private translate: TranslateService
  ) {
    this.saving$ = this.store.select(jobFeature.selectSaving);
    this.loading$ = this.store.select(jobFeature.selectLoading);
    this.profile$ = this.store.select(profileFeature.selectProfile);
  }

  ngOnInit(): void {
    const job$ = this.store.select(jobFeature.selectJob);
    this.subscriptions.add(
      job$.pipe(
        filter(job => job !== null)
      ).subscribe(job => {
        this.router.navigate(['/proposal', job._id])
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
        UIActions.displaymessage({
          params: {
            message: this.translate.instant('proposal.create.waiting'),
            title: this.translate.instant('proposal.create.generating'),
            config: {
              status: 'primary',
              destroyByClick: true,
              preventDuplicates: true,
              duration: 10000,
              icon: {
                icon: 'settings-2-outline',
                pack: 'eva'
              }
            }
          }
        })
      );

      this.store.dispatch(
        JobActions.CreateActions.do({
          job
        })
      );
    }
  }

}
