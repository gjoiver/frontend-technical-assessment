import { Mapper } from "@shared/lib/mappers";
import type {
  Portfolio,
  Project,
  Skill,
  SkillLevel,
  Experience,
  Contact,
  Seo,
} from "@portfolio/core";
import type {
  PortfolioResponse,
  ProjectDto,
  SkillDto,
  ExperienceDto,
  ContactInformationDto,
  SeoDto,
} from "@portfolio/data/dto";

const SKILL_LEVELS: SkillLevel[] = ["Beginner", "Intermediate", "Advanced"];

function toSkillLevel(value?: string | null): SkillLevel | undefined {
  return SKILL_LEVELS.includes(value as SkillLevel)
    ? (value as SkillLevel)
    : undefined;
}

function toProject(dto: ProjectDto): Project {
  return {
    title: dto.title,
    description: dto.description ?? undefined,
    technologies: dto.technologies ?? [],
  };
}

function toSkill(dto: SkillDto): Skill {
  return { name: dto.name, level: toSkillLevel(dto.level) };
}

function toExperience(dto: ExperienceDto): Experience {
  return {
    title: dto.title,
    company: dto.company,
    duration: dto.duration ?? undefined,
    responsibilities: dto.responsibilities ?? undefined,
  };
}

function toContact(dto?: ContactInformationDto | null): Contact | undefined {
  if (!dto) return undefined;
  return {
    email: dto.email ?? undefined,
    phone: dto.phone ?? undefined,
    socialMedia: dto.socialMedia ?? undefined,
  };
}

function toSeo(dto?: SeoDto | null): Seo | undefined {
  if (!dto) return undefined;
  return {
    metaTitle: dto.metaTitle,
    metaDescription: dto.metaDescription,
    keywords: dto.keywords ?? undefined,
  };
}

export class PortfolioMapper extends Mapper<PortfolioResponse, Portfolio> {
  public from(response: PortfolioResponse): Portfolio {
    const data = response.data;
    return {
      aboutMe: data.aboutMe ?? undefined,
      contact: toContact(data.contactInformation),
      projects: (data.projects ?? []).map(toProject),
      skills: (data.skills ?? []).map(toSkill),
      experience: (data.experience ?? []).map(toExperience),
      seo: toSeo(data.seo),
    };
  }
}

export const portfolioMapper = new PortfolioMapper();
