// 'use strict';

// /**
//  * A set of functions called "actions" for `image-upload`
//  */

// module.exports = {
//   // exampleAction: async (ctx, next) => {
//   //   try {
//   //     ctx.body = 'ok';
//   //   } catch (err) {
//   //     ctx.body = err;
//   //   }
//   // }
// };

"use strict";

const { v2: cloudinary } = require("cloudinary");

module.exports = {
  async uploadImage(ctx) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME || "djmlwb0hv",
      api_key: process.env.CLOUDINARY_KEY || "445184356992137",
      api_secret: process.env.CLOUDINARY_SECRET || "K2Hx_2oiPLNSNRDPun1dkvbX_QA",
    });

    try {
      // Log the incoming request for debugging
      console.log("Request Body:", ctx.request.body);

      const { imageUrl } = ctx.request.body;
      if (!imageUrl || typeof imageUrl !== "string" || !imageUrl.startsWith("http")) {
        return ctx.badRequest("Invalid or missing image URL", { received: imageUrl });
      }

      // Log the URL being uploaded
      console.log("Uploading URL:", imageUrl);

      const uploadResult = await cloudinary.uploader.upload(imageUrl, {
        public_id: "custom_image",
      });

      const optimizeUrl = cloudinary.url("custom_image", {
        fetch_format: "auto",
        quality: "auto",
      });

      const autoCropUrl = cloudinary.url("custom_image", {
        crop: "auto",
        gravity: "auto",
        width: 500,
        height: 500,
      });

      return {
        uploadResult,
        optimizeUrl,
        autoCropUrl,
      };
    } catch (error) {
      console.error("Full Error:", error.message, error.stack);
      if (error.http_code) {
        return ctx.badRequest(`Cloudinary Error: ${error.message}`, { details: error });
      }
      return ctx.badRequest("Error uploading image", { error: error.message || error });
    }
  },
};