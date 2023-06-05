import { createReducer, on } from "@ngrx/store";
import * as JobActions from './job.actions';
import { Job } from "../../models/job.model";
import { Proposal } from "../../models/proposal.model";
import { JobItem } from "../../models/job-item.model";

export interface JobState {
  job: Job | null;
  jobs: JobItem[];
  loading: boolean;
  saving: boolean;
  deleting: boolean;
}

export const initialState: JobState = {
  job: null,
  jobs: [],
  loading: false,
  saving: false,
  deleting: false
};

export const jobReducer = createReducer(
  initialState,
  on(JobActions.CreateActions.reset, state => (
    {
      ...state,
      job: null,
      loading: false,
      saving: false,
      deleting: false
    }
  )),
  on(JobActions.LoadAllActions.do, state => (
    {
      ...state,
      jobs: [
        {
          job: {
            proposals: [
              {} as Proposal
            ]
          } as Job
        } as JobItem, {
          job: {
            proposals: [
              {} as Proposal
            ]
          } as Job
        } as JobItem
      ],
      loading: true
    }
  )),
  on(JobActions.LoadAllActions.success, (state, { jobs }) => (
    {
      ...state,
      loading: false,
      jobs: [...jobs]
        .map(job => (
          {
            job,
            removing: false
          }
        ))
        .sort((a: JobItem, b: JobItem) => {
          const aDate = a.job.updatedAt;
          const bDate = b.job.updatedAt;
          if (aDate < bDate) {
            return 1;
          } else if (aDate > bDate) {
            return -1;
          }
          return 0;
        })
    }
  )),
  on(JobActions.LoadActions.do, state => (
    {
      ...state,
      job: {
        proposals: [
          {} as Proposal,
          {} as Proposal,
        ]
      } as Job,
      loading: true
    }
  )),
  on(JobActions.LoadActions.success, (state, { job }) => (
    {
      ...state,
      loading: false,
      job: {
        ...job,
        proposals: [...job.proposals]
          .sort((a: Proposal, b: Proposal) => {
            const aDate = a.updatedAt;
            const bDate = b.updatedAt;
            if (aDate < bDate) {
              return 1;
            } else if (aDate > bDate) {
              return -1;
            }
            return 0;
          }),
      }
    }
  )),
  on(
    JobActions.CreateActions.do,
    (state) => (
      {
        ...state,
        job: {
          proposals: [] as Proposal[]
        } as Job,
        saving: true,
        deleting: true
      }
    )
  ),
  on(JobActions.DeleteActions.do, (state, { id }) => (
      {
        ...state,
        job: null,
        jobs: [
          ...state.jobs.map(job => {
            if (job.job._id === id) {
              return {
                ...job,
                removing: true
              }
            }
            return job;
          })
        ],
        saving: true,
        deleting: true
      }
    )
  ),
  on(
    JobActions.UpdateActions.do,
    state => (
      {
        ...state,
        saving: true
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
        saving: false
      }
    )
  ),
  on(JobActions.DeleteActions.success, (state, { id }) => (
    {
      ...state,
      job: null,
      saving: false,
      deleting: false,
      jobs: [
        ...state.jobs.filter(job =>
          job.job._id !== id
        )
      ]
    }
  ))
);
