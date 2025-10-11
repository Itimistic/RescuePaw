const { Storage }  = require('@google-cloud/storage');
const storage = new Storage({ keyFilename: './gcloud-key.json' });
const bucket = storage.bucket('rescuepaw');

exports.uploadImage = async (req, res) => {
  try {
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: req.file.mimetype,
    });

    blobStream.on('error', (err) => {
      console.error(err);
      res.status(500).send('Upload error');
    });

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      res.status(200).json({ url: publicUrl });
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
};
