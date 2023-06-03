import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from "../../models/user.model";

export const LoadActions = createActionGroup({
  source: "Load User",
  events: {
    "do": emptyProps(),
    "success": props<{ user: User }>()
  }
});

export const UpdateActions = createActionGroup({
  source: "Update User",
  events: {
    "do": props<{ user: User }>(),
    "success": props<{ user: User }>()
  }
});
