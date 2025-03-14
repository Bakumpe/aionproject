'use strict';

/**
 * care service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::care.care');
