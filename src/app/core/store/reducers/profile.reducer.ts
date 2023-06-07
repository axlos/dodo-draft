import { createReducer, on } from "@ngrx/store";
import { Profile } from "../../models/profile.model";
import * as ProfileActions from '../actions/profile.actions';

export interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  saving: boolean;
  uploading: boolean;
  uploaded: boolean;
  error: string | null;
}

export const initialState: ProfileState = {
  profile: null,
  loading: false,
  saving: false,
  uploading: false,
  uploaded: false,
  error: null
};

export const profileReducer = createReducer(
  initialState,
  // Load Profile
  on(ProfileActions.LoadActions.do, state => ({
    ...state,
    profile: null,
    error: null,
    loading: true
  })),
  on(ProfileActions.LoadActions.success, (state, { profile }) => (
    {
      ...state,
      profile,
      loading: false
    }
  )),
  // Upload Profile
  on(ProfileActions.UploadActions.do, state => (
    {
      ...state,
      uploading: true,
      uploaded: false
    }
  )),
  on(ProfileActions.UploadActions.success, state => (
    {
      ...state,
      uploading: false,
      uploaded: true,
      loading: false
    }
  )),
  on(ProfileActions.SaveActions.do, state => (
    {
      ...state,
      saving: true
    }
  )),
  on(ProfileActions.SaveActions.success, (state, { profile }) => (
    {
      ...state,
      profile,
      saving: false,
    }
  )),
  on(ProfileActions.UploadActions.failure, (state, { error }) => (
    {
      ...state,
      error,
      uploading: false,
      uploaded: false,
      loading: false,
      saving: false
    }
  )),
  on(ProfileActions.SaveActions.failure, (state, { error }) => (
    {
      ...state,
      error,
      loading: false,
      saving: false,
    }
  ))
);
