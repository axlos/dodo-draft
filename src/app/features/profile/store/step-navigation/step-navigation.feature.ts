import { createFeature } from "@ngrx/store";
import { stepNavigationReducer } from "./step-navigation.reducer";

export const stepNavigationFeature = createFeature({
  name: 'stepNavigation',
  reducer: stepNavigationReducer,
});

export const {
  name,
  reducer,
  selectIndex
} = stepNavigationFeature;
