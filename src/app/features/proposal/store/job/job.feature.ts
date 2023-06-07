import { createFeature } from "@ngrx/store";
import { jobReducer } from "./job.reducer";

export const jobFeature = createFeature({
  name: 'job',
  reducer: jobReducer
});

export const {
  name,
  reducer,
  selectJobState,
  selectJob,
  selectLoading,
  selectSaving,
  selectJobs,
  selectReset
} = jobFeature;
