const express = require('express');
const Dropbox = require('dropbox');

const router = express.Router();
const Recipe = require('../models/recipe');

router.get('/backup', async (req, res) => {
  try {
    const recipes = await Recipe.getAllRecipes();
    const dbx = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN });
    const backup = JSON.stringify(recipes);
    const timestamp = new Date(Date.now()).toISOString();
    await dbx.filesUpload({
      contents: backup,
      path: `/recipes_${timestamp}.json`,
      mode: {
        '.tag': 'add',
      },
      autorename: true,
      mute: true,
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
