import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Profile } from "../../models/profile.model";
import { SuggestVariant } from "../../models/suggest-variant.model";

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

export const SuggestVariantsActions = createActionGroup({
  source: "Suggest Variants",
  events: {
    "do": props<{ content: string }>(),
    "success": props<{ variants: SuggestVariant[] }>(),
    "approve": props<{ content: string }>(),
    "approveSuccess": props<{ profile: Profile }>(),
    "cancel": emptyProps(),
    "failure": (error: any) => (
      { error }
    )
  }
});

