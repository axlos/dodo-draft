import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map } from "rxjs/operators";
import { CoreService } from "../../services/core.service";
import * as UserActions from "../../../core/store/actions/user.actions";
import { SetupProfile } from "../../../features/profile/enums/setup-profile.enum";
import { HeaderMenuActions } from "../actions/core.actions";

@Injectable()
export class CoreEffects {
  constructor(
    private actions$: Actions,
    private coreService: CoreService
  ) {
  }

  public loadHeaderMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        UserActions.LoadActions.success,
        UserActions.UpdateActions.success
      ),
      filter(action =>
        SetupProfile.Verified === action.user.setupProfile
      ),
      map(() =>
        HeaderMenuActions.load({
          menu: [
            {
              title: 'Create New',
              icon: 'add-icon',
              class: 'ml-2 create-new',
              router: '/create-proposal'
            },
            {
              title: 'History',
              router: '/history'
            },
            {
              title: 'Profile',
              router: '/profile'
            }
          ]
        })
      )
    )
  );

}
