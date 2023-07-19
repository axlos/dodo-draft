import { Experience } from "../../features/profile/models/experience.model";
import { Education } from "../../features/profile/models/education.model";
import { Language } from "../../features/profile/models/language.model";

export interface Profile {
  readonly fullName: string;
  readonly headline: string;
  readonly summary: string;
  readonly language: string;
  readonly experiences: Experience[];
  readonly educations: Education[];
  readonly skills: string[];
  readonly certifications: string[];
  readonly languages: Language[];
}
