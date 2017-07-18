var express = require('express');
var dropbox = require('dropbox');
var router = express.Router();
var Recipe = require('../models/recipe');

router.get('/backup', function(req, res, next) {
  Recipe.getAllRecipes((err, recipes) => {
    if (err) {
      res.status(500).json(err);
    } else {
      var dbx = new dropbox({accessToken: process.env.DROPBOX_TOKEN});
      const backup = JSON.stringify(recipes);
      const timestamp = new Date(Date.now()).toISOString();
      dbx.filesUpload({
        contents: backup,
        path: '/recipes_'+timestamp+'.json',
        mode: {
          ".tag": 'add'
        },
        autorename: true,
        mute: true
      }).then((resp) => {
        res.sendStatus(200);
      }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
    }
  });
});

module.exports = router;