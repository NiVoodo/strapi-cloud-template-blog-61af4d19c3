'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

// Default-Controller + Custom-Action "upsert" (Schlüssel: externalId)
module.exports = createCoreController('api::google-review.google-review', ({ strapi }) => ({
  async upsert(ctx) {
    try {
      const body = ctx.request.body || {};
      const data = body.data || body;

      if (!data || !data.externalId) {
        return ctx.badRequest('Missing "externalId" in body');
      }

      const existing = await strapi.entityService.findMany('api::google-review.google-review', {
        filters: { externalId: data.externalId },
        limit: 1,
      });

      let entity;
      if (Array.isArray(existing) && existing.length) {
        entity = await strapi.entityService.update('api::google-review.google-review', existing[0].id, { data });
      } else {
        entity = await strapi.entityService.create('api::google-review.google-review', { data });
      }

      const sanitized = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitized);
    } catch (err) {
      strapi.log.error('[google-review.upsert] failed:', err);
      return ctx.internalServerError('Upsert failed');
    }
  },
}));
