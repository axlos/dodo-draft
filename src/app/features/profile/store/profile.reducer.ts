import { createReducer, on } from "@ngrx/store";
import { Profile } from "../models/profile.model";
import * as ProfileActions from './profile.actions';

export interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  loaded: boolean;
  uploading: boolean;
  uploaded: boolean;
  error: string | null;
}

export const initialState: ProfileState = {
  profile: null,
  loading: false,
  loaded: false,
  uploading: false,
  uploaded: false,
  error: null,
};

export const profileReducer = createReducer(
  initialState,
  // Load Profile
  on(ProfileActions.LoadActions.do, state => ({
    ...state,
    profile: null,
    error: null,
    loading: true,
    loaded: false
  })),
  on(ProfileActions.LoadActions.success, (state, {profile}) => ({
    ...state,
    profile,
    loading: false,
    loaded: true
  })),
  on(ProfileActions.LoadActions.failure, (state, {error}) => ({
    ...state,
    error
  })),
  // Upload Profile
  on(ProfileActions.UploadActions.do, state => ({
    ...state,
    uploading: true,
    uploaded: false,
    error: null
  })),
  on(ProfileActions.UploadActions.success, state => ({
    ...state,
    uploading: false,
    uploaded: true,
    loading: false
  })),
  on(ProfileActions.UploadActions.failure, (state, {error}) => ({
    ...state,
    uploading: false,
    uploaded: false,
    error
  }))
);
