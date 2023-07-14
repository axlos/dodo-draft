import { createReducer, on } from "@ngrx/store";
import { Profile } from "../../models/profile.model";
import * as ProfileActions from '../actions/profile.actions';
import { SuggestVariantsActions } from '../actions/profile.actions';
import { SuggestVariant } from "../../models/suggest-variant.model";

export interface ProfileState {
  profile: Profile | null;
  variants: SuggestVariant[];
  loading: boolean;
  loaded: boolean;
  suggesting: boolean;
  savingVariant: boolean;
  saving: boolean;
  uploading: boolean;
  uploaded: boolean;
  error: string | null;
}

export const initialState: ProfileState = {
  profile: null,
  variants: [],
  loading: false,
  loaded: false,
  saving: false,
  uploading: false,
  uploaded: false,
  suggesting: false,
  savingVariant: false,
  error: null
};

export const profileReducer = createReducer(
  initialState,
  // Load Profile
  on(ProfileActions.LoadActions.do, state => (
    {
      ...state,
      profile: null,
      error: null,
      loaded: false,
      loading: true
    }
  )),
  on(ProfileActions.LoadActions.success, (state, { profile }) => (
    {
      ...state,
      profile,
      loaded: true,
      loading: false
    }
  )),
  on(ProfileActions.LoadActions.failure, state => (
    {
      ...state,
      loaded: false,
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
  on(ProfileActions.UploadActions.failure, state => (
    {
      ...state,
      uploading: false,
      uploaded: false,
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
  )),
  on(SuggestVariantsActions.do, (state) => (
    {
      ...state,
      suggesting: true,
      variants: []
    }
  )),
  on(SuggestVariantsActions.success, (state, { variants }) => (
    {
      ...state,
      suggesting: false,
      variants: variants
    }
  )),
  on(SuggestVariantsActions.approve, (state) => (
    {
      ...state,
      savingVariant: true
    }
  )),
  on(SuggestVariantsActions.approvesuccess, (state, { profile }) => (
    {
      ...state,
      profile,
      savingVariant: false,
      variants: []
    }
  )),
  on(SuggestVariantsActions.cancel, (state) => (
    {
      ...state,
      variants: []
    }
  )),
  on(SuggestVariantsActions.failure, (state) => (
    {
      ...state,
      suggesting: false
    }
  )),
);
