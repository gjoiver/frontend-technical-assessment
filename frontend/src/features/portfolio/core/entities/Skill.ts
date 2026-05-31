export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Skill {
  name: string;
  level?: SkillLevel;
}
