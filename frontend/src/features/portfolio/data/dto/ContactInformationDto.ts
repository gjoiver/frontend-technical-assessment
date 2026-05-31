export interface ContactInformationDto {
  id: number;
  email?: string | null;
  phone?: string | null;
  socialMedia?: Record<string, string> | null;
}
