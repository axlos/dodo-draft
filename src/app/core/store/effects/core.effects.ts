import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { NbToastrService } from "@nebular/theme";
import { filter, map, tap } from "rxjs/operators";
import { CoreService } from "../../services/core.service";
import * as UserActions from "../../../core/store/actions/user.actions";
import { SetupProfile } from "../../../features/profile/enums/setup-profile.enum";
import { HeaderMenuActions, UIActions } from "../actions/core.actions";
import { HeaderMenu } from "../../enums/header-menu.enum";

@Injectable()
export class CoreEffects {
  constructor(
    private actions$: Actions,
    private coreService: CoreService,
    private toastrService: NbToastrService
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
              id: HeaderMenu.Create,
              title: 'Create New',
              icon: 'add-icon',
              class: 'ml-2 create-new',
              router: '/proposal/create'
            },
            {
              id: HeaderMenu.History,
              title: 'History',
              router: '/proposal/history'
            },
            {
              id: HeaderMenu.Profile,
              title: 'Profile',
              router: 'profile'
            }
          ]
        })
      )
    )
  );

  private displayMessage$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UIActions.displaymessage),
        tap(action => {
          this.toastrService.show(
            action.params.message,
            action.params.title,
            action.params.config
          );
        })
      ),
    { dispatch: false }
  );

}
