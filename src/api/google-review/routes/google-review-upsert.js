'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/google-reviews/upsert',
      handler: 'google-review.upsert',
      config: {
        auth: {
          scope: ['api::google-review.google-review.upsert'],
        },
        policies: [],
        middlewares: [],
      },
    },
  ],
};
