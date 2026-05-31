import type { RichText } from "./RichText";

export interface Experience {
  title: string;
  company: string;
  duration?: string;
  responsibilities?: RichText;
}
