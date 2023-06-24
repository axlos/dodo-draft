import { createReducer, on } from "@ngrx/store";

import { LoginActions, LogoutActions, UpdateUserActions } from '../actions/auth.actions';
import { SetupProfile } from "../../enums/setup-profile.enum";
import { AuthUser } from "../../interfaces/auth-user.interface";

export interface AuthState {
  user: AuthUser | null;
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
      user: {
        email: user['name'],
        name: user['name'],
        sub: user['sub'],
        setupProfile: user['setupProfile'],
        emailVerified: user['email_verified'] === true
      },
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
  on(UpdateUserActions.status, (state, { status }) => (
    {
      ...state,
      user: {
        ...state.user,
        setupProfile: status
      },
    }
  ))
);

