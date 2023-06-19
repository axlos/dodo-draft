import { createReducer, on } from "@ngrx/store";
import { HeaderMenuInterface } from "../../interfaces/header-menu.interface";
import { HeaderMenuActions } from "../actions/core.actions";
import { HeaderMenu } from "../../enums/header-menu.enum";

export interface CoreState {
  headerMenu: HeaderMenuInterface[];
}

export const initialState: CoreState = {
  headerMenu: [
    {
      id: HeaderMenu.Create,
      title: 'How it works',
      router: '/home',
      fragment: 'how-it-works'
    },
    {
      id: HeaderMenu.Create,
      title: 'FAQ',
      router: '/faq'
    },
    {
      id: HeaderMenu.Create,
      title: 'Contact',
      router: '/contact'
    }
  ]
};

export const coreReducer = createReducer(
  initialState,
  // Load User
  on(HeaderMenuActions.load, (state, { menu }) => (
    {
      ...state,
      headerMenu: [
        ...menu
      ],
    }
  )),
);
