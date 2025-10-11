const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage({
  keyFilename: path.join(__dirname, 'gcs-key.json'),
  projectId: 'devtools-class-2025-468614',
});

const bucket = storage.bucket('devtools_project');

module.exports = bucket;