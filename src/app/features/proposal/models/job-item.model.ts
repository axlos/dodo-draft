import { Job } from "./job.model";

export interface JobItem {

  readonly job: Job;
  readonly removing: boolean;

}
