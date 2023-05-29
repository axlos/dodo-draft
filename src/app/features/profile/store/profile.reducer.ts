import { ActionReducerMap, createReducer, MetaReducer, on } from "@ngrx/store";
import * as fromActions from './profile.actions';

export const featureKey:string = 'profile';

export interface ProfileState {
}

export const initialState: ProfileState = {
};

export const profileReducer = createReducer(
  initialState
);
