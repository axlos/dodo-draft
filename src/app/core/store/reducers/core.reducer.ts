import { createReducer, on } from "@ngrx/store";
import { HeaderMenuModel } from "../../models/header-menu.model";
import { HeaderMenuActions } from "../actions/core.actions";

export interface CoreState {
  headerMenu: HeaderMenuModel[];
}

export const initialState: CoreState = {
  headerMenu: []
};

export const coreReducer = createReducer(
  initialState,
  // Load User
  on(HeaderMenuActions.load, (state, { menu }) => (
    {
      ...state,
      headerMenu: menu,
    }
  )),
);
