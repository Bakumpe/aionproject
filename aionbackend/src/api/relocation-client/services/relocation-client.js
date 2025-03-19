'use strict';

/**
 * relocation-client service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::relocation-client.relocation-client');
