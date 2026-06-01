import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { portfolioI18n } from "@portfolio/presentation/i18n";
import { Bar, Inner, Toggle, Nav, NavLink } from "./Header.styles";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <Bar>
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
            <NavLink key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
        </Nav>
      </Inner>
    </Bar>
  );
}
