import { createFeature, createSelector } from "@ngrx/store";
import { coreReducer } from "./core.reducer";

export const coreFeature = createFeature({
  name: 'core',
  reducer: coreReducer,

});

export const {
  name,
  reducer,
  selectCoreState
} = coreFeature;
