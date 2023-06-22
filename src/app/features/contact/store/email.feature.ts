import { createFeature } from "@ngrx/store";
import { emailReducer } from "./email.reducer";

export const emailFeature = createFeature({
  name: 'email',
  reducer: emailReducer
});

export const {
  name,
  reducer,
  selectEmail,
  selectLoading,
  selectSent
} = emailFeature;
