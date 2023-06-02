import { createReducer, on } from "@ngrx/store";
import { LoadActions } from "../actions/user.actions";

import { User } from "../../models/user.model";

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  user: null,
  loading: false,
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
      loading: true
    }
  )),
  on(LoadActions.success, (state, { user }) => (
    {
      ...state,
      user,
      loading: false
    }
  )),
  on(LoadActions.failure, (state, { error }) => (
    {
      ...state,
      error
    }
  )),
);
