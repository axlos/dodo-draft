import { ActionReducerMap } from '@ngrx/store';
import { userFeature } from "./features/user.feature";
import { coreFeature } from "./features/core.feature";
import { UserState } from "./reducers/user.reducer";
import { CoreState } from "./reducers/core.reducer";
import { ProfileState } from "./reducers/profile.reducer";
import { profileFeature } from "./features/profile.feature";

export interface AppState {
  user: UserState,
  core: CoreState,
  profile: ProfileState
}

export const reducers: ActionReducerMap<AppState> = {
  user: userFeature.reducer,
  core: coreFeature.reducer,
  profile: profileFeature.reducer
};
