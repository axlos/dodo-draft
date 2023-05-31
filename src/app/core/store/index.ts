import { ActionReducerMap } from '@ngrx/store';
import { userFeature } from "./features/user.feature";
import { coreFeature } from "./features/core.feature";
import { UserState } from "./reducers/user.reducer";
import { CoreState } from "./reducers/core.reducer";

export interface AppState {
  user: UserState,
  core: CoreState
}

export const reducers: ActionReducerMap<AppState> = {
  user: userFeature.reducer,
  core: coreFeature.reducer
};
