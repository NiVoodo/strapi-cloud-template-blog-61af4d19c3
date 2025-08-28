'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

// Default-Controller + Custom-Action "upsert" (Schlüssel: placeId)
module.exports = createCoreController('api::google-place.google-place', ({ strapi }) => ({
  async upsert(ctx) {
    try {
      const body = ctx.request.body || {};
      const data = body.data || body;

      if (!data || !data.placeId) {
        return ctx.badRequest('Missing "placeId" in body');
      }

      // bestehenden Datensatz per placeId suchen (max. 1)
      const existing = await strapi.entityService.findMany('api::google-place.google-place', {
        filters: { placeId: data.placeId },
        limit: 1,
      });

      let entity;
      if (Array.isArray(existing) && existing.length) {
        entity = await strapi.entityService.update('api::google-place.google-place', existing[0].id, { data });
      } else {
        entity = await strapi.entityService.create('api::google-place.google-place', { data });
      }

      const sanitized = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitized);
    } catch (err) {
      strapi.log.error('[google-place.upsert] failed:', err);
      return ctx.internalServerError('Upsert failed');
    }
  },
}));
