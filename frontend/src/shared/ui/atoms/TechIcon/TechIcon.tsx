import { FiCode } from "react-icons/fi";
import { TECH_ICONS } from "./TechIcon.config";
import type { TechIconProps } from "./TechIcon.types";

function normalize(name: string): string {
  return name.toLowerCase().replace(/[.\s-]/g, "");
}

export function TechIcon({ name, size = 20 }: TechIconProps) {
  const Icon = TECH_ICONS[normalize(name)] ?? FiCode;
  return <Icon size={size} aria-hidden="true" />;
}
