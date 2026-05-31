export type SocialLinks = Record<string, string>;

export interface Contact {
  email?: string;
  phone?: string;
  socialMedia?: SocialLinks;
}
