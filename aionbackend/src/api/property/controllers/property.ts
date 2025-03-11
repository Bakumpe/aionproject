import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::property.property', ({ strapi }) => ({
  // Extend the default find method to fetch all properties
  async find(ctx) {
    try {
      const properties = await strapi.entityService.findMany('api::property.property', {
        populate: {
          photo: true,
          PhotoUrl: true,
        },
      });

      ctx.body = properties; // Send all properties
    } catch (error) {
      ctx.throw(500, 'Internal Server Error');
    }
  },

  // Extend the default findOne method to fetch a single property by ID
  async findOne(ctx) {
    try {
      const { id } = ctx.params;
      const property = await strapi.entityService.findOne('api::property.property', id, {
        populate: {
          photo: true,
          PhotoUrl: true,
        },
      });

      if (!property) {
        ctx.throw(404, 'Property Not Found');
      }

      ctx.body = property; // Send the single property as it is fetched from Strapi
    } catch (error) {
      ctx.throw(500, 'Internal Server Error');
    }
  },

  // Extend other methods as needed...
}));
