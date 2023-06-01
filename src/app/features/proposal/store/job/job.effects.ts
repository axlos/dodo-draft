import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { JobService } from "../../services/job.service";


@Injectable()
export class JobEffects {
  constructor(
    private actions$: Actions,
    private jobService: JobService
  ) {
  }

}
