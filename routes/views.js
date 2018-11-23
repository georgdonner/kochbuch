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

const checkAuth = (req, res, next) => {
  if (req.session.authenticated) {
    return next();
  }
  return res.sendStatus(401);
};

router.get('/recipes/new', checkAuth, (req, res) => {
  res.render('recipe-form', { recipe: defaultRecipe });
});

router.get('/recipe/:id/edit', checkAuth, async (req, res) => {
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
    const descriptionHtml = recipe.description ? markdown.toHTML(recipe.description) : '';
    res.render('recipe', { recipe, descriptionHtml, session: req.session });
  } catch (error) {
    res.send(error);
  }
});

router.get('/', (req, res) => {
  res.render('recipes', { session: req.session });
});

module.exports = router;
