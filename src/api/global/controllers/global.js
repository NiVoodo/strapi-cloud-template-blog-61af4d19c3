'use strict';

/**
 * Public Global SEO endpoint (auth: false)
 * GET /api/global-public?status=published|draft
 */

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreController('api::global.global', ({ strapi }) => ({
  async public(ctx) {
    const status = ctx.query.status === 'draft' ? 'draft' : 'published';

    // Nur ausgewählte Felder + SEO + Default-Bits, nichts Internes
    const data = await strapi.documents('api::global.global').findFirst({
      status,
      populate: {
        defaultShareImage: {},     // 1-Level für Medien
        seoDefaults: { populate: { shareImage: {} } },
      },
      fields: [
        'siteName',
        'defaultMetaTitleSuffix',
        'defaultCanonicalBase',
        'twitterHandle',
        'facebookAppId',
        'robotsDefaultNoindex',
        'robotsDefaultNofollow',
      ],
    });

    if (!data) return ctx.notFound('Global not found');

    ctx.body = data;
  },
}));
