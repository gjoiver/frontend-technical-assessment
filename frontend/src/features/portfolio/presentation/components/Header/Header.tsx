import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useScrollProgress, useScrollSpy } from "@shared/ui/hooks";
import { portfolioI18n } from "@portfolio/presentation/i18n";
import { Bar, Progress, Inner, Toggle, Nav, NavLink } from "./Header.styles";

const SECTION_IDS = Object.keys(portfolioI18n.sections);

export function Header() {
  const [open, setOpen] = useState(false);
  const progress = useScrollProgress();
  const active = useScrollSpy(SECTION_IDS);

  return (
    <Bar $scrolled={progress > 0.001}>
      <Progress $progress={progress} aria-hidden="true" />
      <Inner>
        <Toggle
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <FiX /> : <FiMenu />}
        </Toggle>
        <Nav $open={open} aria-label="Secciones">
          {Object.entries(portfolioI18n.sections).map(([id, label]) => (
            <NavLink
              key={id}
              href={`#${id}`}
              $active={active === id}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </Nav>
      </Inner>
    </Bar>
  );
}
