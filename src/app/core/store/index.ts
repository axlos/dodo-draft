import { ActionReducerMap } from '@ngrx/store';
import { coreFeature } from "./features/core.feature";
import { CoreState } from "./reducers/core.reducer";
import { ProfileState } from "./reducers/profile.reducer";
import { profileFeature } from "./features/profile.feature";
import { AuthState } from "./reducers/auth.reducer";
import { authFeature } from "./features/auth.feature";

export interface AppState {
  core: CoreState,
  profile: ProfileState
  auth: AuthState
}

export const reducers: ActionReducerMap<AppState> = {
  core: coreFeature.reducer,
  profile: profileFeature.reducer,
  auth: authFeature.reducer
};
