const express = require('express');
const Dropbox = require('dropbox');

const router = express.Router();
const Recipe = require('../models/recipe');

router.get('/backup', (req, res) => {
  Recipe.getAllRecipes((err, recipes) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const dbx = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN });
      const backup = JSON.stringify(recipes);
      const timestamp = new Date(Date.now()).toISOString();
      dbx.filesUpload({
        contents: backup,
        path: `/recipes_${timestamp}.json`,
        mode: {
          '.tag': 'add',
        },
        autorename: true,
        mute: true,
      }).then(() => {
        res.sendStatus(200);
      }).catch((uploadErr) => {
        console.error(uploadErr);
        res.sendStatus(500);
      });
    }
  });
});

module.exports = router;
