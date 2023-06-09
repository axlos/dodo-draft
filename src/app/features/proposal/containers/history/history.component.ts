import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { jobFeature } from "../../store/job/job.feature";
import * as JobActions from "../../store/job/job.actions";
import { JobItem } from "../../interfaces/job-item.interface";
import { Router } from "@angular/router";

@Component({
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  public jobs$: Observable<JobItem[]>;
  public loading$: Observable<boolean>;

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.jobs$ = this.store.select(jobFeature.selectJobs);
    this.loading$ = this.store.select(jobFeature.selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(
      JobActions.LoadAllActions.do()
    );
  }

  public delete(id: string): void {
    this.store.dispatch(
      JobActions.DeleteActions.do({ id })
    );
  }

  public create(): void {
    // add router Angular navigate to route /proposal/create
    this.router.navigate(['/proposal/create']).then(() =>
      this.store.dispatch(
        JobActions.CreateActions.reset()
      )
    );
  }
}
