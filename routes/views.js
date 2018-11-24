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

router.get('/login', (req, res) => {
  if (req.session.authenticated) {
    return res.redirect('/');
  }
  return res.render('login', { error: req.query.error });
});

router.post('/zauberwort', (req, res) => {
  const { zauberwort } = req.body;
  if (!zauberwort) {
    return res.status(400).send('Please provide a zauberwort in the request body.');
  } if (zauberwort === process.env.ZAUBERWORT) {
    req.session.authenticated = true;
    return res.redirect('/');
  }
  return res.redirect('/login?error=true');
});

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
