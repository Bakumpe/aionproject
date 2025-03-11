/**
 * car controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::car.car', ({ strapi }) => ({
  // Extend the default find method to fetch all cars
  async find(ctx) {
    try {
      const cars = await strapi.entityService.findMany('api::car.car', {
        populate: {
          CarImage: true,
          images: true,
        },
      });

      ctx.body = cars; // Send all cars
    } catch (error) {
      ctx.throw(500, 'Internal Server Error');
    }
  },

  // Extend the default findOne method to fetch a single car by ID
  async findOne(ctx) {
    try {
      const { id } = ctx.params;
      const car = await strapi.entityService.findOne('api::car.car', id, {
        populate: {
          CarImage: true,
          images: true,
        },
      });

      if (!car) {
        ctx.throw(404, 'Car Not Found');
      }

      ctx.body = car; // Send the single car as it is fetched from Strapi
    } catch (error) {
      ctx.throw(500, 'Internal Server Error');
    }
  },

  // Extend other methods as needed...
}));
