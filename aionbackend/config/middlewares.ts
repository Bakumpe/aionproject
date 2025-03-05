// export default [
//   'strapi::logger',
//   'strapi::errors',
//   'strapi::security',
//   'strapi::cors',
//   'strapi::poweredBy',
//   'strapi::query',
//   'strapi::body',
//   'strapi::session',
//   'strapi::favicon',
//   'strapi::public',
// ];


export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  {
    name: "strapi::body",
    config: {
      formLimit: "4096mb", // modify form body
      jsonLimit: "4096mb", // modify JSON body
      textLimit: "4096mb", // modify text body
      formidable: {
        maxFileSize: 1024 * 1024 * 1024, // modify limit of uploaded file size to 1GB
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
