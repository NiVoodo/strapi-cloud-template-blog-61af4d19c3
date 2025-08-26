'use strict';

/**
 * google-place service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::google-place.google-place');
