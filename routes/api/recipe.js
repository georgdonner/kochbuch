const compression = require('compression');
const express = require('express');
const markdown = require('markdown-it')();

const router = express.Router();

const checkAuth = require('../helpers/check-auth');
const StatusError = require('../helpers/status-error');
const Recipe = require('../../models/recipe');

const toHtml = recipe => ({
  ...recipe,
  description: markdown.render(recipe.description),
});

// Get all recipes
router.get('/recipes', compression(), async (req, res) => {
  const { format = 'markdown' } = req.query;
  const recipes = await Recipe.getAllRecipes();
  const formatted = format === 'html' ? recipes.map(r => toHtml(r)) : recipes;
  return res.json(formatted);
});

router.get('/recipes/search', compression(), async (req, res) => {
  try {
    const { q: query, format = 'markdown' } = req.query;
    const recipes = await Recipe.search(query);
    const formatted = format === 'html' ? recipes.map(r => toHtml(r)) : recipes;
    return res.json(formatted);
  } catch (error) {
    return res.send(error);
  }
});

router.post('/recipes/changes', compression(), async (req, res) => {
  try {
    const { lastUpdated, ids } = req.body;
    const allRecipes = await Recipe.getAllRecipes();
    const removed = ids ? ids.filter(
      id => !allRecipes.find(recipe => recipe._id.toString() === id),
    ) : [];
    const updated = lastUpdated ? allRecipes.filter(recipe => (
      +new Date(recipe.updatedAt) > lastUpdated
    )) : allRecipes;
    const mapped = updated.map(r => toHtml(r));
    return res.json({
      lastUpdated: Date.now(),
      data: {
        removed,
        updated: mapped,
      },
    });
  } catch (error) {
    return res.send(error);
  }
});

router.get('/recipe/:id', async (req, res, next) => {
  try {
    const { format = 'markdown' } = req.query;
    const recipe = await Recipe.getRecipeById(req.params.id);
    if (!recipe) {
      throw new StatusError(`Could not find recipe with id ${req.params.id}`, 404);
    }
    const formatted = format === 'html' ? toHtml(recipe) : recipe;
    return res.json(formatted);
  } catch (error) {
    return next(error);
  }
});

router.get('/recipes/categories', async (req, res, next) => {
  try {
    const categories = await Recipe.distinct('categories');
    return res.json(categories);
  } catch (error) {
    return next(error);
  }
});

router.post('/recipe', checkAuth, async (req, res, next) => {
  try {
    const newRecipe = new Recipe({ ...req.body });
    // still support deprecated heroImage property for kochbuch app
    newRecipe.heroImage = `${newRecipe.image}-/resize/600x/`;
    const saved = await Recipe.addRecipe(newRecipe);
    return res.json(saved);
  } catch (error) {
    return next(error);
  }
});

router.put('/recipe/:id', checkAuth, async (req, res, next) => {
  try {
    const {
      _id, __v, createdAt, updatedAt, ...newData
    } = req.body;
    const recipe = await Recipe.updateRecipe(req.params.id, newData);
    return res.json(recipe);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
