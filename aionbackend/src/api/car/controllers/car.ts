/**
 * car controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::car.car', ({ strapi }) => ({
  // Extend the default find method to fetch all properties
  async find(ctx) {
    const cars = await strapi.entityService.findMany('api::car.car', {
      populate: {
        CarImage: true,
      },
    });

    ctx.body = cars; // Send all cars
  },

  // Extend the default findOne method to fetch a single property by ID
  async findOne(ctx) {
    const { id } = ctx.params;
    const car = await strapi.entityService.findOne('api::car.car', id, {
      populate: {
        CarImage: true,
      },
    });

    ctx.body = car; // Send the single car as it is fetched from Strapi
  },

  // Extend other methods as needed...
}));
