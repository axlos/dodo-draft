import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Job } from "../../models/job.model";

export const LoadAllActions = createActionGroup({
  source: "Load All Job",
  events: {
    "do": emptyProps(),
    "success": props<{ jobs: Job[] }>()
  }
});

export const LoadActions = createActionGroup({
  source: "Load Job",
  events: {
    "do": props<{ id: string }>(),
    "success": props<{ job: Job }>()
  }
});

export const CreateActions = createActionGroup({
  source: "Create Job",
  events: {
    "reset": emptyProps(),
    "restarted": emptyProps(),
    "do": props<{ job: Job }>(),
    "success": props<{ job: Job }>()
  }
});

export const UpdateActions = createActionGroup({
  source: "Update Job",
  events: {
    "do": props<{ id: string, job: Job }>(),
    "success": props<{ job: Job }>(),
    "failure": emptyProps()
  }
});

export const DeleteActions = createActionGroup({
  source: "Delete Job",
  events: {
    "do": props<{ id: string }>(),
    "success": props<{ id: string }>()
  }
});

export const DeleteProposalActions = createActionGroup({
  source: "Delete Proposal from Job",
  events: {
    "do": props<{
      jobId: string,
      proposalId: string
    }>(),
    "success": props<{
      jobId: string,
      proposalId: string
    }>()
  }
});
