import { createFeature } from "@ngrx/store";
import { coreReducer } from "../reducers/core.reducer";

export const coreFeature = createFeature({
  name: 'core',
  reducer: coreReducer,
});

export const {
  name,
  reducer,
  selectCoreState,
  selectHeaderMenu
} = coreFeature;
