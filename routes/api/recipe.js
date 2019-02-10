const compression = require('compression');
const express = require('express');
const { markdown } = require('markdown');

const router = express.Router();

const checkAuth = require('../helpers/check-auth');
const Recipe = require('../../models/recipe');

// Get all recipes
router.get('/recipes', async (req, res) => {
  try {
    const {
      condensed, page = 1, limit = 15, search,
    } = req.query;
    if (condensed) {
      const total = await Recipe.getCount(search);
      const recipes = await Recipe.getPage(Number(page), Number(limit), search);
      const lastUpdatedRecipe = await Recipe.lastUpdated();
      const lastUpdated = lastUpdatedRecipe.length > 0
        ? Date.parse(lastUpdatedRecipe[0].updatedAt)
        : Date.now();
      return res.json({ recipes, total, lastUpdated });
    }
    const recipes = await Recipe.getAllRecipes();
    return res.json(recipes);
  } catch (error) {
    return res.send(error);
  }
});

router.get('/recipes/compressed', compression(), async (req, res) => {
  try {
    const recipes = await Recipe.getAllRecipes();
    const mapped = recipes.map(recipe => ({
      ...recipe,
      description: markdown.toHTML(recipe.description),
      ingredients: recipe.ingredients.map(({ name, hint }) => ({ name, hint })),
    }));
    return res.json(mapped);
  } catch (error) {
    return res.send(error);
  }
});

router.get('/recipe/:id', async (req, res) => {
  try {
    const recipe = await Recipe.getRecipeById(req.params.id);
    res.json(recipe);
  } catch (error) {
    res.send(error);
  }
});

router.get('/recipes/categories', async (req, res) => {
  try {
    const categories = await Recipe.distinct('categories');
    return res.json(categories);
  } catch (error) {
    return res.send(error);
  }
});

router.post('/recipe', checkAuth, async (req, res) => {
  try {
    const newRecipe = new Recipe({ ...req.body });
    // still support deprecated heroImage property for kochbuch app
    newRecipe.heroImage = `${newRecipe.image}-/resize/600x/`;
    const saved = await Recipe.addRecipe(newRecipe);
    res.json(saved);
  } catch (error) {
    res.send(error);
  }
});

router.put('/recipe/:id', checkAuth, async (req, res) => {
  try {
    const {
      _id, __v, createdAt, updatedAt, ...newData
    } = req.body;
    const recipe = await Recipe.updateRecipe(req.params.id, newData);
    res.json(recipe);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
