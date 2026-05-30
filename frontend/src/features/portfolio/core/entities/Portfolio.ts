import type { Contact } from "./Contact";
import type { Experience } from "./Experience";
import type { Project } from "./Project";
import type { RichText } from "./RichText";
import type { Seo } from "./Seo";
import type { Skill } from "./Skill";

export interface Portfolio {
  aboutMe?: RichText;
  contact?: Contact;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  seo?: Seo;
}
