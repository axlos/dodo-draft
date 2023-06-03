import { createReducer, on } from "@ngrx/store";
import { LoadActions, UpdateActions } from "../actions/user.actions";

import { User } from "../../models/user.model";

export interface UserState {
  user: User | null;
  loading: boolean;
}

export const initialState: UserState = {
  user: null,
  loading: false
};

export const userReducer = createReducer(
  initialState,
  on(
    LoadActions.do,
    UpdateActions.do,
    state => (
      {
        ...state,
        user: null,
        loading: true
      }
    )),
  on(
    LoadActions.success,
    UpdateActions.success,
    (state, { user }) => (
      {
        ...state,
        user,
        loading: false
      }
    ))
);
