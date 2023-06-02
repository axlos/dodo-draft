import { createReducer, on } from "@ngrx/store";
import * as JobActions from './job.actions';
import { Job } from "../../models/job.model";
import { Proposal } from "../../models/proposal.model";

export interface JobState {
  job: Job | null;
  jobs: Job[];
  loading: boolean;
  saving: boolean;
  saved: boolean;
  deleting: boolean;
  error: string | null;
}

export const initialState: JobState = {
  job: null,
  jobs: [],
  loading: false,
  saving: false,
  saved: false,
  deleting: false,
  error: null,
};

export const jobReducer = createReducer(
  initialState,
  on(JobActions.LoadAllActions.do, state => (
    {
      ...state,
      jobs: [
        {
          proposals: [
            {} as Proposal
          ]
        } as Job, {
          proposals: [
            {} as Proposal
          ]
        } as Job
      ],
      error: null,
      loading: true
    }
  )),
  on(JobActions.LoadAllActions.success, (state, { jobs }) => (
    {
      ...state,
      jobs: jobs,
      error: null,
      loading: false
    }
  )),
  on(JobActions.LoadActions.do, state => (
    {
      ...state,
      job: null,
      error: null,
      loading: true
    }
  )),
  on(JobActions.LoadActions.success, (state, { job }) => (
    {
      ...state,
      job,
      loading: false
    }
  )),
  on(JobActions.LoadActions.failure, (state, { error }) => (
    {
      ...state,
      error,
      loading: false
    }
  )),
  on(
    JobActions.CreateActions.do,
    JobActions.DeleteActions.do,
    state => (
      {
        ...state,
        job: null,
        error: null,
        saving: true,
        saved: false,
        deleting: true
      }
    )
  ),
  on(
    JobActions.UpdateActions.do,
    state => (
      {
        ...state,
        error: null,
        saving: true,
        saved: false,
        deleting: true
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
  on(JobActions.DeleteActions.success, (state, { id }) => (
    {
      ...state,
      job: null,
      saving: false,
      saved: true,
      deleting: false,
      jobs: [
        ...state.jobs.filter(job =>
          job._id !== id
        )
      ]
    }
  )),
  // Failure
  on(
    JobActions.CreateActions.failure,
    JobActions.UpdateActions.failure,
    JobActions.DeleteActions.failure,
    JobActions.LoadAllActions.failure,
    (state, { error }) => (
      {
        ...state,
        error,
        saving: false,
        loading: false,
        saved: false,
        deleting: false,
      }
    )
  )
);
