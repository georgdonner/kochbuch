const express = require('express');

const router = express.Router();

const Recipe = require('../models/recipe');

router.get('/recipe/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) throw new Error('Recipe not found.');
    res.render('recipe', { recipe });
  } catch (error) {
    res.send(error);
  }
});

router.get('/', (req, res) => {
  res.render('recipes');
});

module.exports = router;
