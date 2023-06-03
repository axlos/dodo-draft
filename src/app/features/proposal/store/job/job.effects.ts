import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap } from "rxjs";
import { map } from "rxjs/operators";
import { JobService } from "../../services/job.service";
import { CreateActions, DeleteActions, LoadActions, LoadAllActions, UpdateActions } from './job.actions';
import * as CoreActions from './../../../../core/store/actions/core.actions';

@Injectable()
export class JobEffects {

  constructor(
    private actions$: Actions,
    private jobService: JobService
  ) {
  }

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
              params: {
                message: error.message,
                title: 'Unexpected Server Error',
                config: {
                  preventDuplicates: true,
                  status: 'danger'
                }
              }
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
              params: {
                message: error.message,
                title: 'Unexpected Server Error',
                config: {
                  preventDuplicates: true,
                  status: 'danger'
                }
              }
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
              params: {
                message: error.message,
                title: 'Unexpected Server Error',
                config: {
                  preventDuplicates: true,
                  status: 'danger'
                }
              }
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
              params: {
                message: error.message,
                title: 'Unexpected Server Error',
                config: {
                  preventDuplicates: true,
                  status: 'danger'
                }
              }
            }))
          )
        )
      )
    )
  );

  public removeJob$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteActions.do),
      switchMap(action =>
        this.jobService.remove(action.id).pipe(
          map(() =>
            DeleteActions.success({
              id: action.id
            })
          ),
          catchError(error =>
            of(CoreActions.UIActions.displaymessage({
              params: {
                message: error.message,
                title: 'Unexpected Server Error',
                config: {
                  preventDuplicates: true,
                  status: 'danger'
                }
              }
            }))
          )
        )
      )
    )
  );

}
