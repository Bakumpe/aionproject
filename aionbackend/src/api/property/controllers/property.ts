import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::property.property', ({ strapi }) => ({
  // Extend the default find method to fetch all properties
  async find(ctx) {
    const properties = await strapi.entityService.findMany('api::property.property', {
      populate: {
        photo: true,
      },
    });

    ctx.body = properties; // Send all properties
  },

  // Extend the default findOne method to fetch a single property by ID
  async findOne(ctx) {
    const { id } = ctx.params;
    const property = await strapi.entityService.findOne('api::property.property', id, {
      populate: {
        photo: true,
      },
    });

    ctx.body = property; // Send the single property as it is fetched from Strapi
  },

  // Extend other methods as needed...
}));




