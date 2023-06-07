import { Injectable } from "@angular/core";
import { catchError, exhaustMap, of, switchMap } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { UserService } from "../../services/user.service";
import { LoadActions, UpdateActions } from "../actions/user.actions";
import * as CoreActions from "../actions/core.actions";
import { UnexpectedServerError } from "../../models/message-config.model";

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {
  }

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
                params: new UnexpectedServerError(error.message)
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
                params: new UnexpectedServerError(error.message)
              }))
            )
          )
      )
    )
  );

}
