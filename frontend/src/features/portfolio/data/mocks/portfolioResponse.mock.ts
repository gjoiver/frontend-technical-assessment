import type { PortfolioResponse } from "@portfolio/data/dto";

export const fullPortfolioResponse: PortfolioResponse = {
  data: {
    id: 1,
    documentId: "doc-1",
    aboutMe: [{ type: "paragraph", children: [{ type: "text", text: "Hi" }] }],
    contactInformation: {
      id: 2,
      email: "me@example.com",
      phone: null,
      socialMedia: { github: "https://github.com/me" },
    },
    projects: [
      {
        __component: "portfolio.project",
        id: 3,
        title: "Portfolio",
        description: null,
        technologies: ["React", "TypeScript"],
      },
    ],
    skills: [
      { id: 4, name: "TypeScript", level: "Advanced" },
      { id: 5, name: "Rust", level: "Wizard" },
    ],
    experience: [
      {
        id: 6,
        title: "Frontend Dev",
        company: "Acme",
        duration: null,
        responsibilities: null,
      },
    ],
    seo: {
      id: 7,
      metaTitle: "My Portfolio",
      metaDescription: "A portfolio",
      keywords: null,
    },
  },
  meta: {},
};

export const emptyPortfolioResponse: PortfolioResponse = {
  data: {
    id: 1,
    documentId: "doc-1",
    aboutMe: null,
    contactInformation: null,
    projects: null,
    skills: null,
    experience: null,
    seo: null,
  },
  meta: {},
};
