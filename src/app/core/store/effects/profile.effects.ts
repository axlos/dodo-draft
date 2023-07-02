import { Injectable } from "@angular/core";
import { catchError, from, of, switchMap } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";

import { ProfileService } from "../../services/profile.service";
import * as ProfileActions from '../actions/profile.actions';
import * as CoreActions from "../actions/core.actions";
import { UnexpectedErrorMessage } from "../../interfaces/message-config.interface";
import { LoginActions, UpdateUserActions } from "../actions/auth.actions";
import { SetupProfile } from "../../enums/setup-profile.enum";

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {
  }

  // Fetch the profile when the user logs in
  public loadProfileAfterLogin$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(LoginActions.success),
        map(() =>
          ProfileActions.LoadActions.do()
        )
      )
  );

  // create ngrx effect to fetch a edit-profile
  public loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.LoadActions.do),
      switchMap(() =>
        this.profileService.getProfile()
          .pipe(
            map(profile =>
              ProfileActions.LoadActions.success({ profile })
            ),
            catchError(() =>
              of(ProfileActions.LoadActions.failure())
            )
          )
      )
    )
  );

  // create ngrx effect to save a profile
  public saveProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.SaveActions.do),
      switchMap(action =>
        this.profileService.save(action.profile)
          .pipe(
            map(profile =>
              ProfileActions.SaveActions.success({ profile })
            ),
            catchError(error =>
              from([
                CoreActions.UIActions.displaymessage({
                    params: {
                      message: 'Please check that you have entered your information correctly',
                      title: 'Save profile',
                      config: {
                        preventDuplicates: true,
                        status: 'warning'
                      }
                    }
                  }
                ),
                ProfileActions.SaveActions.failure({
                  error: error.message
                })
              ])
            )
          )
      )
    )
  );

  public uploadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.UploadActions.do),
      switchMap(action =>
        this.profileService.upload(action.file)
          .pipe(
            map(() =>
              ProfileActions.UploadActions.success()
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                ProfileActions.UploadActions.failure({
                  error: error.message
                }),
                CoreActions.UIActions.displaymessage({
                  params: new UnexpectedErrorMessage('There was an error uploading your file, verify the profile and try again!')
                })
              )
            )
          )
      )
    )
  );

  public setToVerifyStatus$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(ProfileActions.UploadActions.success),
        map(() =>
          UpdateUserActions.status({
            status: SetupProfile.Verify
          })
        )
      )
  );

}
