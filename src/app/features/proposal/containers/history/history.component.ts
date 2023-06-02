import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { jobFeature } from "../../store/job/job.feature";
import * as JobActions from "../../store/job/job.actions";
import { JobHistory } from "../../models/job-history.model";

@Component({
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  public jobs$: Observable<JobHistory[]>;
  public loading$: Observable<boolean>;

  constructor(
    private store: Store
  ) {
    this.jobs$ = this.store.select(jobFeature.mapToJobHistory);
    this.jobs$.pipe().subscribe((jobs) => {
      console.log(jobs);
    });
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
}
