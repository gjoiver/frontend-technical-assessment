import { FiCheck, FiCopy } from "react-icons/fi";
import { Card, SectionTitle } from "@shared/ui/molecules";
import { useClipboard } from "@shared/ui/hooks";
import { sanitizePhone } from "@shared/utils";
import { portfolioI18n } from "@portfolio/presentation/i18n";
import { Info, Social, Link, SocialLink, Row, CopyButton } from "./ContactCard.styles";
import { SOCIAL_ICONS, DEFAULT_SOCIAL_ICON } from "./ContactCard.config";
import type { ContactCardProps } from "./ContactCard.types";

export function ContactCard({ contact }: ContactCardProps) {
  const { copied, copy } = useClipboard();

  if (!contact) return null;

  const { email, phone, socialMedia } = contact;
  const socials = socialMedia ? Object.entries(socialMedia) : [];

  return (
    <section id="contact">
      <SectionTitle>{portfolioI18n.sections.contact}</SectionTitle>
      <Card>
        <Info>
          {email && (
            <Row>
              <Link href={`mailto:${email}`}>{email}</Link>
              <CopyButton
                type="button"
                onClick={() => copy(email)}
                aria-label={portfolioI18n.actions.copy}
              >
                {copied === email ? <FiCheck /> : <FiCopy />}
              </CopyButton>
            </Row>
          )}
          {phone && (
            <Row>
              <Link
                href={`tel:${sanitizePhone(phone)}`}
                aria-label={`${portfolioI18n.actions.call} ${phone}`}
              >
                {phone}
              </Link>
              <CopyButton
                type="button"
                onClick={() => copy(phone)}
                aria-label={portfolioI18n.actions.copy}
              >
                {copied === phone ? <FiCheck /> : <FiCopy />}
              </CopyButton>
            </Row>
          )}
        </Info>
        {socials.length > 0 && (
          <Social>
            {socials.map(([platform, url]) => {
              const Icon =
                SOCIAL_ICONS[platform.toLowerCase()] ?? DEFAULT_SOCIAL_ICON;
              return (
                <SocialLink
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={platform}
                >
                  <Icon size={20} />
                </SocialLink>
              );
            })}
          </Social>
        )}
      </Card>
    </section>
  );
}
