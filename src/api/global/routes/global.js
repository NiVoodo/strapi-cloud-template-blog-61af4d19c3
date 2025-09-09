'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/global-public',
      handler: 'global.public',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
