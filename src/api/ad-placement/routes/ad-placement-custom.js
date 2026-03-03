'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/ad-placements/by-position/:position',
      handler: 'ad-placement.byPosition',
      config: { auth: false, policies: [], middlewares: [] },
    },
  ],
};
