import { ActionReducerMap, createReducer, MetaReducer, on } from "@ngrx/store";
import * as fromActions from "./core.actions";

export interface CoreState {
  uploading: boolean;
  uploaded: boolean;
  error: string | null;
}

export const initialState: CoreState = {
  uploading: false,
  uploaded: false,
  error: null,
};

export const coreReducer = createReducer(
  initialState,
  on(fromActions.uploadFile, state =>
    ({
      ...state,
      uploading: true,
      uploaded: false,
      error: null
    })
  ),
  on(fromActions.uploadFileSuccess, state =>
    ({
      ...state,
      uploading: false,
      uploaded: true,
      loading: false
    })
  ),
  on(fromActions.uploadFileFailure, (state, { error }) =>
    ({
      ...state,
      uploading: false,
      uploaded: false,
      error
    })
  )
);
