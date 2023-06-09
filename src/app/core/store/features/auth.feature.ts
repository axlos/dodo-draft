import { createFeature } from "@ngrx/store";
import { authReducer } from "../reducers/auth.reducer";

export const authFeature = createFeature({
  name: 'auth',
  reducer: authReducer,
});

export const {
  name,
  reducer,
  selectAuthState,
  selectUser,
  selectIsAuthenticated
} = authFeature;
