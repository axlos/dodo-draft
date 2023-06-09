import { createReducer, on } from "@ngrx/store";
import { User } from "@auth0/auth0-spa-js";

import { LoginActions, LogoutActions } from '../actions/auth.actions';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false
};

export const authReducer = createReducer(
  initialState,
  // Load User
  on(LoginActions.success, (state, { user, isAuthenticated }) => (
    {
      ...state,
      user,
      isAuthenticated
    }
  )),
  // Load User
  on(LogoutActions.success, (state) => (
    {
      ...state,
      user: null,
      isAuthenticated: false
    }
  )),
);
