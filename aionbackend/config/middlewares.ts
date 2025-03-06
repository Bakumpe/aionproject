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
  {
    name: 'strapi::cors',
    config: {
      origin: ['*'], // Allow all origins. You can specify allowed origins like ['http://example.com']
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formLimit: '4096mb', // Modify form body
      jsonLimit: '4096mb', // Modify JSON body
      textLimit: '4096mb', // Modify text body
      formidable: {
        maxFileSize: 1024 * 1024 * 1024, // Modify limit of uploaded file size to 1GB
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

