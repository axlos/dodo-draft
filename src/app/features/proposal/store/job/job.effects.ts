import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, delay, of, switchMap } from "rxjs";
import { map } from "rxjs/operators";
import { JobService } from "../../services/job.service";
import {
  CreateActions,
  DeleteActions,
  DeleteProposalActions,
  LoadActions,
  LoadAllActions,
  UpdateActions
} from './job.actions';
import * as CoreActions from './../../../../core/store/actions/core.actions';
import { UnexpectedServerError } from "../../../../core/models/message-config.model";

@Injectable()
export class JobEffects {

  constructor(
    private actions$: Actions,
    private jobService: JobService
  ) {
  }

  // Create an effect for resetting the job state
  public resetJob$ = createEffect(() =>
    this.actions$.pipe(
      delay(200),
      ofType(CreateActions.reset),
      map(() =>
        CreateActions.restarted()
      ))
  );

  public loadAllJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadAllActions.do),
      switchMap(() =>
        this.jobService.findAll().pipe(
          map(jobs =>
            LoadAllActions.success({ jobs })
          ),
          catchError(error =>
            of(CoreActions.UIActions.displaymessage({
              params: new UnexpectedServerError(error.message)
            }))
          )
        )
      )
    )
  );

  public loadJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadActions.do),
      switchMap(action =>
        this.jobService.findById(action.id).pipe(
          map(job =>
            LoadActions.success({ job })
          ),
          catchError(error =>
            of(CoreActions.UIActions.displaymessage({
              params: new UnexpectedServerError(error.message)
            }))
          )
        )
      )
    )
  );

  public createJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateActions.do),
      switchMap(action =>
        this.jobService.create(action.job).pipe(
          map(job =>
            CreateActions.success({ job })
          ),
          catchError(error =>
            of(CoreActions.UIActions.displaymessage({
              params: new UnexpectedServerError(error.message)
            }))
          )
        )
      )
    )
  );

  public updateJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateActions.do),
      switchMap(action =>
        this.jobService.update(action.id, action.job).pipe(
          map(job =>
            UpdateActions.success({ job })
          ),
          catchError(error =>
            of(CoreActions.UIActions.displaymessage({
              params: new UnexpectedServerError(error.message)
            }))
          )
        )
      )
    )
  );

  public deleteJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteActions.do),
      switchMap(action =>
        this.jobService.delete(action.id).pipe(
          map(() =>
            DeleteActions.success({
              id: action.id
            })
          ),
          catchError(error =>
            of(CoreActions.UIActions.displaymessage({
              params: new UnexpectedServerError(error.message)
            }))
          )
        )
      )
    )
  );

  // Create effects to delete proposal by proposal id from job
  public deleteProposalFromJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteProposalActions.do),
      switchMap(action =>
        this.jobService.deleteProposalFromJob(action.proposalId).pipe(
          map(() =>
            DeleteProposalActions.success({
              jobId: action.jobId,
              proposalId: action.proposalId
            })
          ),
          catchError(error =>
            of(CoreActions.UIActions.displaymessage({
              params: new UnexpectedServerError(error.message)
            }))
          )
        )
      )
    )
  );

}
