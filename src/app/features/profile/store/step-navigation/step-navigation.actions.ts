import { createActionGroup, props } from '@ngrx/store';

export const StepNavigation = createActionGroup({
  source: "Step Navigation",
  events: {
    "go": props<{ index: number }>()
  }
});
