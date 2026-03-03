'use strict';

/**
 * AdPlacement controller.
 *
 * Endpoint:
 *   GET /api/ad-placements/by-position/:position
 *
 * Gibt die aufgelösten Ads gemäß der konfigurierten Strategie zurück.
 */

const { factories } = require('@strapi/strapi');

const POPULATE_AD = {
  assetGroups: {
    populate: {
      media: true,
      mobileMedia: true,
    },
  },
};

function isAdActive(ad) {
  const now = new Date();
  if (ad.validFrom && new Date(ad.validFrom) > now) return false;
  if (ad.validUntil && new Date(ad.validUntil) < now) return false;
  return true;
}

function pickWeightedRandom(ads) {
  if (!ads.length) return [];
  const totalWeight = ads.reduce((sum, ad) => sum + (ad.weight || 1), 0);
  let rand = Math.random() * totalWeight;
  for (const ad of ads) {
    rand -= ad.weight || 1;
    if (rand <= 0) return [ad];
  }
  return [ads[ads.length - 1]];
}

function applyStrategy(strategy, ads, limit) {
  switch (strategy) {
    case 'all':
      return ads.slice(0, limit);
    case 'sequential':
      return ads.slice(0, limit);
    case 'weighted-random': {
      const result = [];
      const pool = [...ads];
      while (result.length < limit && pool.length > 0) {
        const [picked] = pickWeightedRandom(pool);
        result.push(picked);
        pool.splice(pool.indexOf(picked), 1);
      }
      return result;
    }
    case 'random':
    default: {
      const shuffled = [...ads].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, limit);
    }
  }
}

module.exports = factories.createCoreController('api::ad-placement.ad-placement', ({ strapi }) => ({
  async byPosition(ctx) {
    const { position } = ctx.params;
    if (!position) return ctx.badRequest('Missing position');

    const placements = await strapi.documents('api::ad-placement.ad-placement').findMany({
      status: 'published',
      filters: { position: { $eq: position } },
      populate: {
        advertisements: { populate: POPULATE_AD },
      },
    });

    if (!placements.length) {
      ctx.body = { position, ads: [] };
      return;
    }

    const placement = placements[0];
    const activeAds = (placement.advertisements || []).filter(isAdActive);
    const selected = applyStrategy(placement.strategy, activeAds, placement.limit || 1);

    ctx.body = {
      position,
      strategy: placement.strategy,
      indexName: placement.indexName || null,
      query: placement.query || null,
      filters: placement.filters || null,
      sort: placement.sort || null,
      ads: selected,
    };
  },
}));
