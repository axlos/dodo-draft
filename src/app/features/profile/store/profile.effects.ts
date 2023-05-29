import { Injectable } from "@angular/core";
import { catchError, of, switchMap } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { ProfileService } from "../services/profile.service";
import * as fromActions from './profile.actions';
import { map } from "rxjs/operators";

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {
  }
}
