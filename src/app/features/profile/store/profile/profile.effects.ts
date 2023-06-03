import { Injectable } from "@angular/core";
import { catchError, of, switchMap } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { ProfileService } from "../../services/profile.service";
import { LoadActions, UploadActions } from './profile.actions';
import * as CoreActions from "../../../../core/store/actions/core.actions";

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {
  }

  // create ngrx effect to fetch a edit-profile
  public loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadActions.do),
      switchMap(() =>
        this.profileService.getProfile()
          .pipe(
            map(profile =>
              LoadActions.success({ profile })
            ),
            catchError((error: any) =>
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

  public uploadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UploadActions.do),
      switchMap(action =>
        this.profileService.upload(action.file).pipe(
          map(() =>
            UploadActions.success()
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
