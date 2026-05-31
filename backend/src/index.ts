// import type { Core } from '@strapi/strapi';

import { Core } from "@strapi/strapi";

import { seed } from "./seed";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const publicRole = await strapi
      .query("plugin::users-permissions.role")
      .findOne({ where: { type: "public" } });

    if (!publicRole) return;

    const actions = ["api::portfolio.portfolio.find", "api::page.page.find"];

    for (const action of actions) {
      const exists = await strapi
        .query("plugin::users-permissions.permission")
        .findOne({ where: { action, role: publicRole.id } });

      if (!exists) {
        await strapi
          .query("plugin::users-permissions.permission")
          .create({ data: { action, role: publicRole.id } });

        strapi.log.info(`[bootstrap] Permiso público habilitado: ${action}`);
      }
    }

    await seed({ strapi });
  },
};
