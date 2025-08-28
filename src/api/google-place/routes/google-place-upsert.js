'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/google-places/upsert',
      handler: 'google-place.upsert',
      config: {
        // v5: auth muss ein Objekt sein, keine booleans
        // Token braucht entweder "Full access" ODER die unten angegebene Scope.
        auth: {
          scope: ['api::google-place.google-place.upsert'],
        },
        policies: [],
        middlewares: [],
      },
    },
  ],
};
