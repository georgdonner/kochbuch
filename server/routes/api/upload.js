const { Readable, PassThrough } = require('stream');
const express = require('express');
const fileUpload = require('express-fileupload');
const sharp = require('sharp');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const { requireAuth } = require('../middleware/auth');
const StatusError = require('../middleware/status-error');

const IMG_WIDTHS = [400, 800, 1000, 1600, 2000];

const router = express.Router();
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});

const validateQuery = (query) => {
  const keys = ['height', 'width', 'top', 'left'];
  const cast = Object.fromEntries(
    Object
      .entries(query)
      .filter(([key]) => keys.includes(key))
      .map(([key, val]) => [key, +val]),
  );

  if (cast.height === 0 || cast.width === 0) {
    return null;
  }
  return cast;
};

const getResizeStream = ({ width, extract }) => {
  const stream = sharp()
    .rotate();
  if (extract) {
    stream.extract(extract);
  }
  return stream
    .resize(width)
    .toFormat('jpeg');
};

const getWriteStream = ({ Key }) => {
  const pass = new PassThrough();
  return {
    writeStream: pass,
    uploadPromise: s3.upload({
      Body: pass,
      Bucket: process.env.AWS_BUCKET,
      ContentType: 'image/jpeg',
      Key,
    }).promise(),
  };
};

router.post('/upload/image', requireAuth('creator'), fileUpload(), async (req, res, next) => {
  const { file } = req.files;
  if (!file) {
    return res.status(400).send('No image file provided');
  }
  const uuid = uuidv4();
  try {
    const images = await Promise.all(IMG_WIDTHS.map(async (imgWidth) => {
      const readStream = Readable.from(file.data);

      const extract = Object.keys(req.query).length ? validateQuery(req.query) : null;
      const resizeStream = getResizeStream({ width: imgWidth, extract });

      const { writeStream, uploadPromise } = getWriteStream({ Key: `${uuid}_${imgWidth}.jpg` });

      readStream
        .pipe(resizeStream)
        .pipe(writeStream);

      const data = await uploadPromise;
      return data;
    }));

    if (!images.length) {
      throw new StatusError('No images were uploaded', 500);
    }
    return res.json({ url: images[0].Location.replace(/\d+.jpg/, '1000.jpg') });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
