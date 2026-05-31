import type { RichText } from "@portfolio/core";

export interface ProjectDto {
  __component: string;
  id: number;
  title: string;
  description?: RichText | null;
  technologies?: string[] | null;
}
