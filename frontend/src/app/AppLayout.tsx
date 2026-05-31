import { Outlet } from "react-router-dom";
import { Bar, Nav, Item } from "./AppLayout.styles";
import { navItems } from "./AppLayout.config";

export function AppLayout() {
  return (
    <>
      <Bar>
        <Nav>
          {navItems.map(({ to, label, end }) => (
            <Item key={to} to={to} end={end}>
              {label}
            </Item>
          ))}
        </Nav>
      </Bar>
      <Outlet />
    </>
  );
}
