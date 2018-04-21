const express = require('express');

const router = express.Router();

const Recipe = require('../models/recipe');
const Weekplan = require('../models/weekplan');
const Shoppinglist = require('../models/shoppinglist');

// RECIPES

// Get all recipes
router.get('/recipes', (req, res) => {
  Recipe.getAllRecipes((err, recipes) => {
    if (err) {
      res.send(err);
    }
    res.json(recipes);
  });
});

// Get single recipe
router.get('/recipe/:id', (req, res) => {
  Recipe.getRecipeById(req.params.id, (err, recipe) => {
    if (err) {
      res.send(err);
    }
    res.json(recipe);
  });
});

// Save recipe
router.post('/recipe', (req, res) => {
  const newRecipe = new Recipe({ ...req.body });
  Recipe.addRecipe(newRecipe, (err, recipe) => {
    if (err) {
      res.send(err);
    }
    res.json(recipe);
  });
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
router.put('/recipe/:id', (req, res) => {
  const updRecipe = new Recipe({ ...req.body });
  const newData = updRecipe.toObject();
  delete newData._id;
  Recipe.updateRecipe(req.params.id, newData, (err, recipe) => {
    if (err) {
      res.send(err);
    }
    res.json(recipe);
  });
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
