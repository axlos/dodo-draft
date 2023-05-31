import { createReducer, on } from "@ngrx/store";
import { StepNavigation } from "./step-navigation.actions";

export interface StepNavigationState {
  index: number;
}

export const initialState: StepNavigationState = {
  index: 0
};

export const stepNavigationReducer = createReducer(
  initialState,
  // Load Profile
  on(StepNavigation.go, (state, { index }) => (
    {
      ...state,
      index: index,
    }
  )),
);
