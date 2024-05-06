const path = require('path');
const fs = require('fs').promises;
const express = require('express');
const Recipe = require('../models/recipe');

const router = express.Router();

const redirectIfAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return res.redirect('/');
  }
  return next();
};

const getIndexFile = async (recipe) => {
  let content = await fs.readFile(path.resolve('build', 'index.html'), { encoding: 'utf-8' });
  const title = recipe?.title || 'Kochbuch';
  content = content.replace('Kochbuch', title);
  content = content.replace('__OG_TITLE__', title);
  if (recipe?.image) {
    content = content.replace(
      /property="og:image" content=".*?"/,
      `property="og:image" content="${recipe.image.replace(/\d+.jpg/, '800.jpg')}"`,
    );
  }
  return content;
};

const clientRoute = async (req, res) => {
  const match = req.path.match(/^\/recipe\/(\w+)$/);
  let recipe;
  if (match) {
    const recipeId = match[1];
    recipe = await Recipe.getRecipeById(recipeId);
  }
  const content = await getIndexFile(recipe);
  res.type('text/html');
  res.status(200);
  return res.send(content);
};

router.get('/login', redirectIfAuthenticated, clientRoute);
router.get('/signup', redirectIfAuthenticated, clientRoute);
router.get('/logout', (req, res) => {
  delete req.session;
  return res.redirect('/');
});

router.get('*', clientRoute);

module.exports = router;
