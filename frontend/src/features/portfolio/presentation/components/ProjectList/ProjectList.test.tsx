// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "@shared/ui/theme/theme";
import type { Project } from "@portfolio/core/entities";
import { projectsMock } from "@portfolio/data/mocks";
import { ProjectList } from "./ProjectList";

function renderProjects(projects: Project[] = projectsMock) {
  return render(
    <ThemeProvider theme={theme}>
      <ProjectList projects={projects} />
    </ThemeProvider>,
  );
}

describe("Feature: ProjectList renders the portfolio projects", () => {
  it(
    `
      Given a list of projects
      When the section is rendered
      Then each project shows its title and its technology tags
    `,
    () => {
      // Act
      renderProjects();

      // Assert
      expect(screen.getByText("Flowlite")).toBeTruthy();
      expect(screen.getByText("Nequiz")).toBeTruthy();
      expect(screen.getByText("Flutter")).toBeTruthy();
      expect(screen.getByText("Angular")).toBeTruthy();
    },
  );

  it(
    `
      Given an empty list of projects
      When the section is rendered
      Then nothing is rendered
    `,
    () => {
      // Act
      const { container } = renderProjects([]);

      // Assert
      expect(container.firstChild).toBeNull();
    },
  );
});
