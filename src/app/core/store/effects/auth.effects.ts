import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { AuthService } from "../../services/auth.service";
import { LoginActions, LogoutActions } from "../actions/auth.actions";

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
        map(() =>
          this.authService.login()
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


}
