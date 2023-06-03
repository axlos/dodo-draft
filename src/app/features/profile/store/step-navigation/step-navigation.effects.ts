import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map } from "rxjs/operators";
import { StepNavigation } from "./step-navigation.actions";
import * as ProfileActions from '../profile/profile.actions';
import * as UserActions from "../../../../core/store/actions/user.actions";
import { SetupProfile } from "../../enums/setup-profile.enum";

@Injectable()
export class StepNavigationEffects {

  constructor(
    private actions$: Actions
  ) {
  }

  public loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.LoadActions.success),
      map((action) => {
        let index = 0;
        switch (action.user.setupProfile) {
          case SetupProfile.Verify:
            index = 1;
            break
          case SetupProfile.Verified:
            index = 2;
        }
        return StepNavigation.go({
          index
        });
      })
    )
  );

  public loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StepNavigation.go),
      filter(action =>
        action.index === 1
      ),
      map(() =>
        ProfileActions.LoadActions.do()
      )
    )
  );


}
