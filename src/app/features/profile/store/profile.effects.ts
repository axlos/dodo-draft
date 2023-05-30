import { Injectable } from "@angular/core";
import { catchError, of, switchMap } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { ProfileService } from "../services/profile.service";
import * as ProfileActions from './profile.actions';

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
      ofType(ProfileActions.LoadActions.do),
      switchMap(() =>
        this.profileService.getProfile()
          .pipe(
            map(profile =>
              ProfileActions.LoadActions.success({profile})
            ),
            catchError((error: any) =>
              of(ProfileActions.LoadActions.failure({error}))
            )
          )
      )
    )
  );

  public uploadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.UploadActions.do),
      switchMap(action =>
        this.profileService.upload(action.file).pipe(
          map(() =>
            ProfileActions.UploadActions.success()
          ),
          catchError(error =>
            of(ProfileActions.UploadActions.failure({
              error: 'Error uploading file, try again!'
            }))
          )
        )
      )
    )
  );


}
