import { Text } from "@shared/ui/atoms";
import { Card, SectionTitle } from "@shared/ui/molecules";
import { portfolioI18n } from "@portfolio/presentation/i18n";
import { Info, Social, Link } from "./ContactCard.styles";
import { SOCIAL_ICONS, DEFAULT_SOCIAL_ICON } from "./ContactCard.config";
import type { ContactCardProps } from "./ContactCard.types";

export function ContactCard({ contact }: ContactCardProps) {
  if (!contact) return null;

  const socials = contact.socialMedia ? Object.entries(contact.socialMedia) : [];

  return (
    <section id="contact">
      <SectionTitle>{portfolioI18n.sections.contact}</SectionTitle>
      <Card>
        <Info>
          {contact.email && (
            <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
          )}
          {contact.phone && <Text variant="body">{contact.phone}</Text>}
        </Info>
        {socials.length > 0 && (
          <Social>
            {socials.map(([platform, url]) => {
              const Icon =
                SOCIAL_ICONS[platform.toLowerCase()] ?? DEFAULT_SOCIAL_ICON;
              return (
                <Link
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={platform}
                >
                  <Icon size={20} />
                </Link>
              );
            })}
          </Social>
        )}
      </Card>
    </section>
  );
}
