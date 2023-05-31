import { createReducer, on } from "@ngrx/store";
import { LoadActions } from "../actions/user.actions";

import { User } from "../../models/user.model";

export interface UserState {
  user: User | null;
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

export const initialState: UserState = {
  user: null,
  loading: false,
  loaded: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  // Load User
  on(LoadActions.do, state => (
    {
      ...state,
      user: null,
      error: null,
      loading: true,
      loaded: false
    }
  )),
  on(LoadActions.success, (state, { user }) => (
    {
      ...state,
      user,
      loading: false,
      loaded: true
    }
  )),
  on(LoadActions.failure, (state, { error }) => (
    {
      ...state,
      error
    }
  )),
);
