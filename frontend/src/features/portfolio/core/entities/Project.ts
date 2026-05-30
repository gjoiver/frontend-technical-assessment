import type { RichText } from "./RichText";

export interface Project {
  title: string;
  description?: RichText;
  technologies: string[];
}
