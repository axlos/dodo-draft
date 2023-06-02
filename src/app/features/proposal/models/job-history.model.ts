import { Job } from "./job.model";

export interface JobHistory {

  readonly job: Job;
  readonly removing: boolean;

}
