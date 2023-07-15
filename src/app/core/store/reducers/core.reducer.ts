import { createReducer, on } from '@ngrx/store';
import { NbMenuItem } from '@nebular/theme';

import { HeaderMenuActions } from '../actions/core.actions';
import { HeaderMenu } from '../../enums/header-menu.enum';

export interface CoreState {
  headerMenu: NbMenuItem[];
}

export const initialState: CoreState = {
  headerMenu: [
    {
      data: HeaderMenu.Create,
      title: 'How it works',
      link: '/home',
      fragment: 'how-it-works',
    },
    {
      data: HeaderMenu.Create,
      title: 'FAQ',
      link: '/faq',
    },
    {
      data: HeaderMenu.Create,
      title: 'Contact',
      link: '/contact',
    },
  ],
};

export const coreReducer = createReducer(
  initialState,
  // Load User
  on(HeaderMenuActions.load, (state, { menu }) => ({
    ...state,
    headerMenu: [...menu],
  }))
);
