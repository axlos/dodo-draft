import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { CoreService } from "../../services/core.service";

@Injectable()
export class CoreEffects {
  constructor(
    private actions$: Actions,
    private coreService: CoreService
  ) {
  }
}
