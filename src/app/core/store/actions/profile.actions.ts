import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Profile } from "../../models/profile.model";

export const LoadActions = createActionGroup({
  source: "Load Profile",
  events: {
    "do": emptyProps(),
    "success": props<{ profile: Profile }>(),
    "failure": emptyProps()
  }
});

export const UploadActions = createActionGroup({
  source: "Upload Profile",
  events: {
    "do": props<{ file: File }>(),
    "success": emptyProps(),
    "failure": (error: any) => (
      { error }
    )
  }
});

export const SaveActions = createActionGroup({
  source: "Save Profile",
  events: {
    "do": props<{ profile: Partial<Profile> }>(),
    "success": props<{ profile: Profile }>(),
    "failure": (error: any) => (
      { error }
    )
  }
});
