import type { IconType } from "react-icons";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa6";

export const SOCIAL_ICONS: Record<string, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaXTwitter,
  x: FaXTwitter,
  instagram: FaInstagram,
};

export const DEFAULT_SOCIAL_ICON: IconType = FaGlobe;
