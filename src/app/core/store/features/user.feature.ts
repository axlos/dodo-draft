import { createFeature } from "@ngrx/store";
import { userReducer } from "../reducers/user.reducer";

export const userFeature = createFeature({
  name: 'user',
  reducer: userReducer,
});

export const {
  name,
  reducer,
  selectUserState,
  selectUser,
  selectLoading,
  selectLoaded,
  selectError,
} = userFeature;
