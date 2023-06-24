import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { AuthService } from "../../services/auth.service";
import { LoginActions, LogoutActions, UpdateUserActions } from "../actions/auth.actions";
import { catchError, of, switchMap } from "rxjs";
import * as CoreActions from "../actions/core.actions";
import { UnexpectedErrorMessage } from "../../interfaces/message-config.interface";
import { SetupProfile } from "../../enums/setup-profile.enum";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {
  }

  // create effects to handle login and logout actions
  public login$ = createEffect(() =>
      this.actions$.pipe(
        ofType(LoginActions.do),
        map((action) =>
          this.authService.login(action.screenHint)
        )
      ),
    { dispatch: false }
  );

  public logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(LogoutActions.do),
        map(() =>
          this.authService.logout()
        )
      ),
    { dispatch: false }
  );

  // Create effect to handle verify profile action
  public verifyProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateUserActions.verify),
      switchMap(() =>
        this.authService.verifyProfile()
          .pipe(
            map(user =>
              UpdateUserActions.status({
                status: SetupProfile.Verified
              })
            ),
            catchError((error: any) =>
              of(CoreActions.UIActions.displaymessage({
                params: new UnexpectedErrorMessage(error.message)
              }))
            )
          )
      )
    )
  );

}
