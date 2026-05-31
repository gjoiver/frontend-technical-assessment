import type { RichText } from "@portfolio/core";

export interface ExperienceDto {
  id: number;
  title: string;
  company: string;
  duration?: string | null;
  responsibilities?: RichText | null;
}
