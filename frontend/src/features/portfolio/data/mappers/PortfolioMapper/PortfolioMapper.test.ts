import { describe, it, expect } from "vitest";
import { portfolioMapper } from "./PortfolioMapper";
import {
  fullPortfolioResponse,
  emptyPortfolioResponse,
} from "@portfolio/data/mocks";

describe("Feature: PortfolioMapper maps a Strapi response to the Portfolio domain entity", () => {
  it(
    `
      Given a fully populated Strapi response
      When it is mapped to the domain
      Then fields are renamed, normalized and narrowed
    `,
    () => {
      // Arrange
      const response = fullPortfolioResponse;

      // Act
      const portfolio = portfolioMapper.from(response);

      // Assert
      expect(portfolio.contact).toEqual({
        email: "me@example.com",
        phone: undefined,
        socialMedia: { github: "https://github.com/me" },
      });
      expect(portfolio.projects).toEqual([
        {
          title: "Portfolio",
          description: undefined,
          technologies: ["React", "TypeScript"],
        },
      ]);
      expect(portfolio.skills[0].level).toBe("Advanced");
      expect(portfolio.skills[1].level).toBeUndefined();
      expect(portfolio.aboutMe).toHaveLength(1);
      expect(portfolio.seo).toEqual({
        metaTitle: "My Portfolio",
        metaDescription: "A portfolio",
        keywords: undefined,
      });
    },
  );

  it(
    `
      Given a response with null collections and components
      When it is mapped to the domain
      Then collections default to [] and optionals to undefined
    `,
    () => {
      // Arrange
      const response = emptyPortfolioResponse;

      // Act
      const portfolio = portfolioMapper.from(response);

      // Assert
      expect(portfolio.projects).toEqual([]);
      expect(portfolio.skills).toEqual([]);
      expect(portfolio.experience).toEqual([]);
      expect(portfolio.contact).toBeUndefined();
      expect(portfolio.seo).toBeUndefined();
      expect(portfolio.aboutMe).toBeUndefined();
    },
  );
});
