import { createFeature, createSelector } from "@ngrx/store";
import { jobReducer } from "./job.reducer";

export const jobFeature = createFeature({
  name: 'job',
  reducer: jobReducer,
  extraSelectors: ({
    selectJobs
  }) => (
    {
      mapToJobHistory: createSelector(selectJobs, (jobs) =>
        jobs.map(job => (
          {
            job: job,
            removing: false
          }
        ))
      )
    }
  )
});

export const {
  name,
  reducer,
  selectJobState,
  selectJob,
  selectLoading,
  selectSaving,
  selectSaved,
  selectError,
  selectJobs,
} = jobFeature;
