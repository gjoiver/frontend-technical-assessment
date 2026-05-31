import type { Core } from "@strapi/strapi";
import { portfolioSeed } from "./portfolio.seed";
import { pageSeed } from "./page.seed";

type SingleTypeUid = "api::portfolio.portfolio" | "api::page.page";

async function seedIfEmpty(
  strapi: Core.Strapi,
  uid: SingleTypeUid,
  label: string,
  data: Record<string, unknown>,
): Promise<void> {
  const documents = strapi.documents(uid);

  const existing = await documents.findFirst();
  if (existing) return;

  const created = await documents.create({ data: data as never });
  await documents.publish({ documentId: created.documentId });
  strapi.log.info(`[seed] ${label} creado y publicado`);
}

/**
 * Idempotent content seeding, run from `bootstrap`. Keeps the "works from a
 * clean clone, no manual admin steps" guarantee.
 */
export async function seed({ strapi }: { strapi: Core.Strapi }): Promise<void> {
  await seedIfEmpty(
    strapi,
    "api::portfolio.portfolio",
    "portfolio",
    portfolioSeed,
  );
  await seedIfEmpty(strapi, "api::page.page", "page", pageSeed);
}
