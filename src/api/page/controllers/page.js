'use strict';

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreController('api::page.page', ({ strapi }) => ({
  async bySlug(ctx) {
    const { slug } = ctx.params;
    // v5: 'status' statt publicationState
    const status = ctx.query.status === 'draft' ? 'draft' : 'published';

    const page = await strapi.documents('api::page.page').findFirst({
      status,
      filters: { slug: { $eq: slug } },
      populate: {
        blocks: {
          on: {
            // Medien + Buttons direkt an den Blöcken
            'blocks.hero-banner':   { populate: ['media', 'buttons'] },
            'blocks.media-text':    { populate: ['media', 'buttons'] },

            // Card/Logo Grids: Items inkl. Media
            'blocks.card-grid':     { populate: { items: { populate: ['media'] } } },
            'blocks.logo-cloud':    { populate: { items: { populate: ['media'] } } },

            // *** DIESE HIER FEHLTEN ***
            'blocks.feature-list':  { populate: { items: true } },   // ← Items (keine Media nötig)
            'blocks.accordion-faq': { populate: { items: true } },   // ← FAQ-Items (content/contentHtml)
            'blocks.cta-banner':    { populate: ['buttons'] },       // ← Buttons für CTA
            'blocks.button-group':  { populate: ['buttons'] },       // ← Buttons Gruppe

            // Weitere Blöcke
            'blocks.testimonial':   { populate: ['avatar', 'logo'] },
            'blocks.pricing-table': { populate: { plans: { populate: ['features', 'cta'] } } },
            'blocks.stats':         true,
            'blocks.steps':         true,
          },
        },
      },
    });

    if (!page) return ctx.notFound('Page not found');
    ctx.body = page;
  },
}));
