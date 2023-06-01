import { Proposal } from "./proposal.model";

export interface Job {
  readonly _id: string;
  readonly title: string;
  readonly details: string;
  readonly question: string;
  readonly experiences: boolean;
  readonly educations: boolean;
  readonly certifications: boolean;
  readonly languages: boolean;
  readonly proposals: Proposal[];
}
