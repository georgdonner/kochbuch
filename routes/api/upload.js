const express = require('express');
const fileUpload = require('express-fileupload');
const sharp = require('sharp');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const checkAuth = require('../helpers/check-auth');
const StatusError = require('../helpers/status-error');

const IMG_WIDTHS = [400, 800, 1000, 1600, 2000];

const router = express.Router();
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});

const castQuery = (query) => Object.fromEntries(
  Object.entries(query).map(([key, val]) => [key, +val]),
);

router.post('/upload/image', checkAuth, fileUpload(), async (req, res, next) => {
  const { file } = req.files;
  if (!file) {
    return res.status(400).send('No image file provided');
  }
  const uuid = uuidv4();
  try {
    const images = await Promise.all(IMG_WIDTHS.map(async (imgWidth) => {
      const sharpImg = sharp(file.data).rotate();
      if (req.query) {
        sharpImg.extract(castQuery(req.query));
      }
      const resized = await sharpImg
        .resize(imgWidth)
        .jpeg()
        .toBuffer();

      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: `${uuid}_${imgWidth}.jpg`,
        Body: resized,
        ContentType: 'image/jpeg',
      };
      const data = await s3.upload(params).promise();
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
