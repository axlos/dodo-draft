import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap } from "rxjs";
import { map } from "rxjs/operators";

import { CoreService } from "../services/core.service";
import * as fromActions from "./core.actions";

@Injectable()
export class CoreEffects {
  constructor(
    private actions$: Actions,
    private coreService: CoreService
  ) {
  }

  public uploadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.uploadFile),
      switchMap(action =>
        this.coreService.upload(action.file).pipe(
          map(() =>
            fromActions.uploadFileSuccess()
          ),
          catchError(error =>
            of(fromActions.uploadFileFailure({
              error: 'Error uploading file, try again!'
            }))
          )
        )
      )
    )
  );

}
