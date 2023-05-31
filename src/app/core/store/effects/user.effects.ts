import { Injectable } from "@angular/core";
import { catchError, of, switchMap } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { UserService } from "../../services/user.service";
import { LoadActions, UpdateActions } from "../actions/user.actions";

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
      switchMap(() =>
        this.userService.get()
          .pipe(
            map(user =>
              LoadActions.success({ user })
            ),
            catchError((error: any) =>
              of(LoadActions.failure({ error }))
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
              of(UpdateActions.failure({ error }))
            )
          )
      )
    )
  );

}
