// module.exports = {
//   routes: [
//     // {
//     //  method: 'GET',
//     //  path: '/image-upload',
//     //  handler: 'image-upload.exampleAction',
//     //  config: {
//     //    policies: [],
//     //    middlewares: [],
//     //  },
//     // },
//   ],
// };

"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/image-upload",
      handler: "image-upload.uploadImage",
      config: {
        policies: [], // Add authentication policies if needed
      },
    },
  ],
};