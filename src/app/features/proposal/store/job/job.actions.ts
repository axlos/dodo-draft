import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Job } from "../../models/job.model";

export const LoadAllActions = createActionGroup({
  source: "Load All Job",
  events: {
    "do": emptyProps(),
    "success": props<{ jobs: Job[] }>(),
    "failure": (error: any) => (
      { error }
    )
  }
});

export const LoadActions = createActionGroup({
  source: "Load Job",
  events: {
    "do": props<{ id: string }>(),
    "success": props<{ job: Job }>(),
    "failure": (error: any) => (
      { error }
    )
  }
});

export const CreateActions = createActionGroup({
  source: "Create Job",
  events: {
    "do": props<{ job: Job }>(),
    "success": props<{ job: Job }>(),
    "failure": (error: any) => (
      { error }
    )
  }
});

export const UpdateActions = createActionGroup({
  source: "Update Job",
  events: {
    "do": props<{ id: string, job: Job }>(),
    "success": props<{ job: Job }>(),
    "failure": (error: any) => (
      { error }
    )
  }
});

export const DeleteActions = createActionGroup({
  source: "Delete Job",
  events: {
    "do": props<{ id: string }>(),
    "success": props<{ id: string }>(),
    "failure": (error: any) => (
      { error }
    )
  }
});
