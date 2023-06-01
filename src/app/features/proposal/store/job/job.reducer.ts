import { createReducer, on } from "@ngrx/store";
import * as JobActions from './job.actions';
import { Job } from "../../models/job.model";

export interface JobState {
  job: Job | null;
  loading: boolean;
  loaded: boolean;
  saving: boolean;
  saved: boolean;
  error: string | null;
}

export const initialState: JobState = {
  job: null,
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  error: null,
};

export const jobReducer = createReducer(
  initialState,
  // Load Job
  on(JobActions.LoadActions.do, state => (
    {
      ...state,
      job: null,
      error: null,
      loading: true,
      loaded: false
    }
  )),
  on(JobActions.LoadActions.success, (state, { job }) => (
    {
      ...state,
      job,
      loading: false,
      loaded: true
    }
  )),
  on(JobActions.LoadActions.failure, (state, { error }) => (
    {
      ...state,
      error,
      loading: false,
      loaded: false
    }
  )),
  on(
    JobActions.CreateActions.do,
    JobActions.UpdateActions.do,
    JobActions.RemoveActions.do,
    state => (
      {
        ...state,
        job: null,
        error: null,
        saving: true,
        saved: false
      }
    )
  ),
  on(
    JobActions.CreateActions.success,
    JobActions.UpdateActions.success,
    (state, { job }) => (
      {
        ...state,
        job,
        saving: false,
        saved: true
      }
    )
  ),
  on(JobActions.RemoveActions.success, state => (
    {
      ...state,
      job: null,
      saving: false,
      saved: true
    }
  )),
  // Failure
  on(
    JobActions.CreateActions.failure,
    JobActions.UpdateActions.failure,
    JobActions.RemoveActions.failure,
    (state, { error }) => (
      {
        ...state,
        error,
        saving: false,
        saved: false
      }
    )
  )
);
