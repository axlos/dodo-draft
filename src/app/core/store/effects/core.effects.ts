import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { NbToastrService } from "@nebular/theme";
import { filter, map, tap } from "rxjs/operators";
import { CoreService } from "../../services/core.service";
import * as AuthActions from "../../../core/store/actions/auth.actions";
import { SetupProfile } from "../../../features/profile/enums/setup-profile.enum";
import { HeaderMenu } from "../../enums/header-menu.enum";
import { HeaderMenuActions, UIActions } from "../actions/core.actions";

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
        AuthActions.LoginActions.success,
        AuthActions.UpdateUserActions.status
      ),
      filter((action: any) => {
        if (action.user) {
          return SetupProfile.Verified === action.user.setupProfile;
        }
        return true;
      }),
      map(() =>
        HeaderMenuActions.load({
          menu: [
            {
              id: HeaderMenu.Create,
              title: 'Create New',
              icon: 'plus-outline',
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
