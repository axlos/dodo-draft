import { createReducer } from "@ngrx/store";

export interface CoreState {
}

export const initialState: CoreState = {};

export const coreReducer = createReducer(
  initialState
);
