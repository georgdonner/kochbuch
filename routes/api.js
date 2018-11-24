const express = require('express');

const router = express.Router();

const Recipe = require('../models/recipe');
const Weekplan = require('../models/weekplan');
const Shoppinglist = require('../models/shoppinglist');

// RECIPES

// Get all recipes
router.get('/recipes', async (req, res) => {
  try {
    const {
      condensed, page = 1, limit = 15, search,
    } = req.query;
    if (!req.session.authenticated && search === process.env.ZAUBERWORT) {
      req.session.authenticated = true;
      return res.json({ authenticated: true });
    }
    if (condensed) {
      const total = await Recipe.getCount(search);
      const recipes = await Recipe.getPage(Number(page), Number(limit), search);
      return res.json({ recipes, total });
    }
    const recipes = await Recipe.getAllRecipes();
    return res.json(recipes);
  } catch (error) {
    return res.send(error);
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

// Get single recipe
router.get('/recipe/:id', async (req, res) => {
  try {
    const recipe = await Recipe.getRecipeById(req.params.id);
    res.json(recipe);
  } catch (error) {
    res.send(error);
  }
});

// Save recipe
router.post('/recipe', async (req, res) => {
  try {
    const newRecipe = new Recipe({ ...req.body });
    const saved = await Recipe.addRecipe(newRecipe);
    res.json(saved);
  } catch (error) {
    res.send(error);
  }
});

/* Delete recipe
router.delete('/recipe/:id', function (req, res) {
    Recipe.removeRecipe(req.params.id, function (err, recipe) {
        if (err) {
            res.send(err);
        }
        res.json(recipe);
     });
 });
 */

// Update recipe
router.put('/recipe/:id', async (req, res) => {
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

// WEEKPLAN

// Get weekplan
router.get('/plan/:name', (req, res) => {
  Weekplan.getPlanByName(req.params.name, (err, plan) => {
    if (err) {
      res.send(err);
    }
    res.json(plan);
  });
});

// New weekplan
router.post('/plans', (req, res) => {
  const newPlan = new Weekplan({ ...req.body });
  Weekplan.addPlan(newPlan, (err, plan) => {
    if (err) {
      res.send(err);
    }
    res.json(plan);
  });
});

// Update weekplan
router.put('/plan/:name', (req, res) => {
  const updPlan = new Weekplan({ ...req.body });

  const newData = updPlan.toObject();
  delete newData._id;
  Weekplan.updatePlan(req.params.name, newData, (err, plan) => {
    if (err) {
      res.send(err);
    }
    res.json(plan);
  });
});

// SHOPPING LIST

// Get Shopping List
router.get('/list/:name', (req, res) => {
  Shoppinglist.getListByName(req.params.name, (err, list) => {
    if (err) {
      res.send(err);
    }
    res.json(list);
  });
});

// New Shopping List
router.post('/lists', (req, res) => {
  const newList = new Shoppinglist({ ...req.body });

  Shoppinglist.addList(newList, (err, list) => {
    if (err) {
      res.send(err);
    }
    res.json(list);
  });
});

// Update Shopping List
router.put('/list/:name', (req, res) => {
  const updList = new Shoppinglist({ ...req.body });

  const newData = updList.toObject();
  delete newData._id;
  Shoppinglist.updateList(req.params.name, newData, (err, list) => {
    if (err) {
      res.send(err);
    }
    res.json(list);
  });
});

module.exports = router;
