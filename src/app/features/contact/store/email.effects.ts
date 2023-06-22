import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap } from "rxjs";
import { map } from "rxjs/operators";

import * as CoreActions from "../../../core/store/actions/core.actions";
import { SendEmailActions } from './email.actions';
import { EmailService } from "../services/email.service";
import { UnexpectedErrorMessage } from "../../../core/interfaces/message-config.interface";

@Injectable()
export class EmailEffects {

  constructor(
    private actions$: Actions,
    private emailService: EmailService
  ) {
  }

  public sendEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SendEmailActions.do),
      switchMap((action) =>
        this.emailService.send(action.email).pipe(
          map(jobs =>
            SendEmailActions.success()
          ),
          catchError(error =>
            of(
              SendEmailActions.failure(),
              CoreActions.UIActions.displaymessage({
                params: new UnexpectedErrorMessage(error.message)
              }))
          )
        )
      )
    )
  );


}
