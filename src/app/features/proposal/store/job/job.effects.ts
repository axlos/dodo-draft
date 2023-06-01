import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap } from "rxjs";
import { map } from "rxjs/operators";
import { JobService } from "../../services/job.service";
import { CreateActions, LoadActions, RemoveActions, UpdateActions } from './job.actions';

@Injectable()
export class JobEffects {

  constructor(
    private actions$: Actions,
    private jobService: JobService
  ) {
  }

  public loadJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadActions.do),
      switchMap(action =>
        this.jobService.findById(action.id).pipe(
          map(job =>
            LoadActions.success({ job })
          ),
          catchError(error =>
            of(LoadActions.failure({ error }))
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
            of(CreateActions.failure({ error }))
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
            of(UpdateActions.failure({ error }))
          )
        )
      )
    )
  );

  public removeJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RemoveActions.do),
      switchMap(action =>
        this.jobService.remove(action.id).pipe(
          map(() =>
            RemoveActions.success()
          ),
          catchError(error =>
            of(RemoveActions.failure({ error }))
          )
        )
      )
    )
  );

}
