export interface NavItem {
  to: string;
  label: string;
  end?: boolean;
}

export const navItems: NavItem[] = [
  { to: "/", label: "Portafolio", end: true },
  { to: "/products", label: "Productos" },
];
