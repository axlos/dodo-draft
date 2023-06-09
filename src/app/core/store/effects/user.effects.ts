import { Injectable } from "@angular/core";
import { catchError, exhaustMap, of, switchMap } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { UnexpectedErrorMessage } from "../../interfaces/message-config.interface";
import { UserService } from "../../services/user.service";
import { LoadActions, UpdateActions } from "../actions/user.actions";
import * as CoreActions from "../actions/core.actions";
import { LoginActions } from "../actions/auth.actions";

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {
  }

  // Fetch the user when the user logs in
  public loadUserAfterLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.success),
      map(() =>
        LoadActions.do()
      )
    )
  );

  public loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadActions.do),
      exhaustMap(() =>
        this.userService.get()
          .pipe(
            map(user =>
              LoadActions.success({ user })
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

  // create effect for UpdateActions
  public updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateActions.do),
      switchMap((action) =>
        this.userService.update(action.user)
          .pipe(
            map(user =>
              UpdateActions.success({ user })
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
