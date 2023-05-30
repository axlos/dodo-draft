import { Experience } from "./experience.model";
import { Education } from "./education.model";

export interface Profile {
  readonly fullName: string;
  readonly headline: string;
  readonly summary: string;
  readonly experiences: Experience[];
  readonly educations: Education[];
  readonly skills: string[];
  readonly certifications: string[];
  readonly languages: string[];
}
