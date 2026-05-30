import { factories } from "@strapi/strapi";

const DEFAULT_POPULATE = {
  contactInformation: true,
  projects: true,
  skills: true,
  experience: true,
  seo: true,
} as const;

export default factories.createCoreController(
  "api::portfolio.portfolio",
  () => ({
    async find(ctx) {
      ctx.query = { ...ctx.query, populate: DEFAULT_POPULATE };

      return await super.find(ctx);
    },
  }),
);
