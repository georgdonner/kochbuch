const express = require('express');
const { markdown } = require('markdown');

const router = express.Router();

const Recipe = require('../models/recipe');

const defaultRecipe = {
  title: '',
  servings: 2,
  duration: 30,
  difficulty: 1,
  ingredients: [],
  description: '',
  categories: [],
};

router.get('/recipes/new', (req, res) => {
  res.render('recipe-form', { recipe: defaultRecipe });
});

router.get('/recipe/:id/edit', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) throw new Error('Recipe not found.');
    res.render('recipe-form', { recipe });
  } catch (error) {
    res.send(error);
  }
});

router.get('/recipe/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) throw new Error('Recipe not found.');
    const descriptionHtml = markdown.toHTML(recipe.description);
    res.render('recipe', { recipe, descriptionHtml });
  } catch (error) {
    res.send(error);
  }
});

router.get('/', (req, res) => {
  res.render('recipes');
});

module.exports = router;
