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

router.post('/plan/:name', async (req, res) => {
  try {
    await Weekplan.addEntry(req.params.name, req.body);
    return res.sendStatus(201);
  } catch (error) {
    return res.send(error);
  }
});

router.put('/plan/:name/:id', async (req, res) => {
  try {
    await Weekplan.updateEntry(req.params.name, req.params.id, req.body);
    return res.sendStatus(200);
  } catch (error) {
    return res.send(error);
  }
});

router.delete('/plan/:name/:id', async (req, res) => {
  try {
    await Weekplan.deleteEntry(req.params.name, req.params.id);
    return res.sendStatus(200);
  } catch (error) {
    return res.send(error);
  }
});

// SHOPPING LIST

// Get Shopping List
router.get('/list/:name', async (req, res) => {
  try {
    const list = await Shoppinglist.getByName(req.params.name);
    return res.json(list);
  } catch (error) {
    return res.send(error);
  }
});

// New Shopping List
router.post('/lists', async (req, res) => {
  try {
    const newList = new Shoppinglist({ ...req.body });
    const list = await Shoppinglist.addList(newList);
    return res.json(list);
  } catch (error) {
    return res.send(error);
  }
});

// Update Shopping List
router.put('/list/:name', async (req, res) => {
  try {
    const updList = new Shoppinglist({ ...req.body });
    const newData = updList.toObject();
    delete newData._id;
    const list = await Shoppinglist.updateList(req.params.name, newData);
    return res.json(list);
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
