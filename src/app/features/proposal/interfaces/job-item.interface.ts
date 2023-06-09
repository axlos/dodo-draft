import { Job } from "../models/job.model";

export interface JobItem {

  readonly job: Job;
  readonly removing: boolean;

}
