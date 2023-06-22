import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Email } from "../models/email.model";

export const SendEmailActions = createActionGroup({
  source: "Send Email",
  events: {
    "do": props<{ email: Email }>(),
    "success": emptyProps(),
    "failure": emptyProps(),
  }
});
