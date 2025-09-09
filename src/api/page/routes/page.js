'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/pages/by-slug/:slug',
      handler: 'page.bySlug',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/pages/slugs',
      handler: 'page.slugs',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
