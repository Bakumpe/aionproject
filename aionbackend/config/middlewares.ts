export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://aiongetaion.netlify.app', 'http://localhost:5173'], // Allow specific origins
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
