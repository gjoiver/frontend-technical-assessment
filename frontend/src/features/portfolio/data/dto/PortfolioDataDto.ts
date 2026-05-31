import type { RichText } from "@portfolio/core";
import type { ContactInformationDto } from "./ContactInformationDto";
import type { ProjectDto } from "./ProjectDto";
import type { SkillDto } from "./SkillDto";
import type { ExperienceDto } from "./ExperienceDto";
import type { SeoDto } from "./SeoDto";

export interface PortfolioDataDto {
  id: number;
  documentId: string;
  aboutMe?: RichText | null;
  contactInformation?: ContactInformationDto | null;
  projects?: ProjectDto[] | null;
  skills?: SkillDto[] | null;
  experience?: ExperienceDto[] | null;
  seo?: SeoDto | null;
}
