'use strict';

module.exports = {
  async upload(files, config = {}) {
    return strapi.db.transaction(async (trx) => {
      // Access the original upload service
      const uploadService = strapi.plugin('upload').service('upload');

      // Ensure folder retrieval uses the transaction
      const folder = await uploadService.getAPIUploadFolder().transacting(trx);

      // Perform the file upload with the transaction
      const uploadedFiles = await uploadService.uploadFiles(files, { folder }).transacting(trx);

      return uploadedFiles;
    });
  },
};