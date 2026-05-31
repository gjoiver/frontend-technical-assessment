import { Text } from "@shared/ui/atoms";
import { Card, SectionTitle } from "@shared/ui/molecules";
import { portfolioI18n } from "@portfolio/presentation/i18n";
import { Info, Social, Link } from "./ContactCard.styles";
import type { ContactCardProps } from "./ContactCard.types";

export function ContactCard({ contact }: ContactCardProps) {
  if (!contact) return null;

  const socials = contact.socialMedia ? Object.entries(contact.socialMedia) : [];

  return (
    <section>
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
            {socials.map(([platform, url]) => (
              <Link key={platform} href={url} target="_blank" rel="noreferrer">
                {platform}
              </Link>
            ))}
          </Social>
        )}
      </Card>
    </section>
  );
}
