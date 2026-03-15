// src/api/page/controllers/page.js
'use strict';

/**
 * Dynamischer Deep-Populate-Controller für Strapi v5 (CommonJS).
 * Endpunkte:
 *   GET /api/pages/by-slug/:slug?status=published|draft&depth=4
 *   GET /api/pages/slugs?status=published|draft
 */

const { factories } = require('@strapi/strapi');

/** Utils */
const isObject = (v) => v && typeof v === 'object' && !Array.isArray(v);
const getAttrs = (model) => (model?.attributes || model?.schema?.attributes || {});
const ONE_LEVEL = Object.freeze({});

/** Komponenten-Populate rekursiv erstellen */
function buildPopulateForComponent(strapi, compUid, options = {}) {
  const { maxDepth = 4, seen = new Set() } = options;
  if (!compUid || seen.has(compUid) || maxDepth <= 0) return ONE_LEVEL;
  seen.add(compUid);

  const comp = strapi.components?.[compUid];
  const attrs = getAttrs(comp);
  if (!comp || !isObject(attrs)) return ONE_LEVEL;

  const populate = {};

  for (const [name, attr] of Object.entries(attrs)) {
    if (!isObject(attr)) continue;

    switch (attr.type) {
      case 'media': {
        populate[name] = ONE_LEVEL;
        break;
      }
      case 'relation': {
        if (maxDepth > 1 && attr.target) {
          const targetModel =
            strapi.contentTypes?.[attr.target] ||
            strapi.components?.[attr.target];
          const targetAttrs = getAttrs(targetModel);
          if (targetModel && isObject(targetAttrs)) {
            const relPopulate = {};
            for (const [tName, tAttr] of Object.entries(targetAttrs)) {
              if (!isObject(tAttr)) continue;
              if (tAttr.type === 'media' || tAttr.type === 'relation') {
                relPopulate[tName] = ONE_LEVEL;
              }
            }
            populate[name] = Object.keys(relPopulate).length
              ? { populate: relPopulate }
              : ONE_LEVEL;
          } else {
            populate[name] = ONE_LEVEL;
          }
        } else {
          populate[name] = ONE_LEVEL;
        }
        break;
      }
      case 'component': {
        const child = buildPopulateForComponent(strapi, attr.component, {
          maxDepth: maxDepth - 1,
          seen,
        });
        populate[name] = { populate: child };
        break;
      }
      case 'dynamiczone': {
        const comps = Array.isArray(attr.components) ? attr.components : [];
        const on = {};
        for (const cUid of comps) {
          const child = buildPopulateForComponent(strapi, cUid, {
            maxDepth: maxDepth - 1,
            seen,
          });
          on[cUid] = Object.keys(child).length ? { populate: child } : {};
        }
        if (Object.keys(on).length) {
          populate[name] = { on };
        }
        break;
      }
      default:
        break;
    }
  }

  return Object.keys(populate).length ? populate : ONE_LEVEL;
}

/** Content-Type-Populate erstellen (inkl. Dynamic-Zones + SEO-Komponente) */
function buildPopulateForContentType(strapi, ctUid, options = {}) {
  const { maxDepth = 4 } = options;
  const ct = strapi.contentTypes?.[ctUid];
  const attrs = getAttrs(ct);
  if (!ct || !isObject(attrs)) return {};

  const populate = {};

  for (const [name, attr] of Object.entries(attrs)) {
    if (!isObject(attr)) continue;

    switch (attr.type) {
      case 'media':
      case 'relation':
        populate[name] = ONE_LEVEL;
        break;

      case 'component': {
        const child = buildPopulateForComponent(strapi, attr.component, {
          maxDepth: maxDepth - 1,
          seen: new Set(),
        });
        populate[name] = { populate: child };
        break;
      }

      case 'dynamiczone': {
        const comps = Array.isArray(attr.components) ? attr.components : [];
        const on = {};
        for (const cUid of comps) {
          const child = buildPopulateForComponent(strapi, cUid, {
            maxDepth: maxDepth - 1,
            seen: new Set(),
          });
          on[cUid] = Object.keys(child).length ? { populate: child } : {};
        }
        if (Object.keys(on).length) {
          populate[name] = { on };
        }
        break;
      }

      default:
        break;
    }
  }

  return populate;
}

module.exports = factories.createCoreController('api::page.page', ({ strapi }) => ({
  async bySlug(ctx) {
    const { slug } = ctx.params;
    if (!slug) return ctx.badRequest('Missing slug');

    const status = ctx.query.status === 'draft' ? 'draft' : 'published';
    const depthParam = Number(ctx.query.depth);
    const maxDepth = Number.isFinite(depthParam) && depthParam > 0 ? Math.min(depthParam, 8) : 4;

    const populate = buildPopulateForContentType(strapi, 'api::page.page', { maxDepth });

    if (process.env.NODE_ENV !== 'production') {
      try {
        strapi.log.debug(`[page.bySlug] populate => ${JSON.stringify(populate)}`);
      } catch { /* no-op */ }
    }

    const page = await strapi.documents('api::page.page').findFirst({
      status,
      filters: { slug: { $eq: slug } },
      populate,
    });

    if (!page) return ctx.notFound('Page not found');
    ctx.body = page;
  },

  /** Lightweight Liste für Sitemap/ISR: slug + updatedAt */
  async slugs(ctx) {
    const status = ctx.query.status === 'draft' ? 'draft' : 'published';
    const res = await strapi.documents('api::page.page').findMany({
      status,
      fields: ['slug', 'updatedAt'],
      limit: 10000
    });
    ctx.body = res.map(p => ({ slug: p.slug, updatedAt: p.updatedAt }));
  },
}));
