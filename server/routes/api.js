var express = require('express');
var router = express.Router();

var Recipe = require('../models/recipe');    

// Get all recipes
router.get('/recipes', function (req, res, next) { 
    Recipe.getAllRecipes(function (err, recipes) { 
        if(err){
            res.send(err);
        }
        res.json(recipes);
     });
 });

// Get single recipe
router.get('/recipe/:id', function (req, res, next) { 
    Recipe.getRecipeById(req.params.id, function (err, recipe) { 
        if(err){
            res.send(err);
        }
        res.json(recipe);
     });
 });

// Save recipe
router.post('/recipe', function (req, res, next) { 
    let newRecipe = new Recipe({
        title: req.body.title,
        duration: req.body.duration,
        difficulty: req.body.difficulty,
        ingredients: req.body.ingredients,
        description: req.body.description,
        image: req.body.image
    });

    Recipe.addRecipe(newRecipe, function (err, recipe) {
        if (err) {
            res.send(err);
        }
        res.json(recipe);
    });
 });

// Delete recipe
router.delete('/recipe/:id', function (req, res, next) {
    Recipe.removeRecipe(req.params.id, function (err, recipe) { 
        if (err) {
            res.send(err);
        }
        res.json(recipe);
     });
 });

// Update recipe
router.put('/recipe/:id', function (req, res, next) {
    let updRecipe = new Recipe({
        title: req.body.title,
        duration: req.body.duration,
        difficulty: req.body.difficulty,
        ingredients: req.body.ingredients,
        description: req.body.description,
        image: req.body.image
    });

    var newData = updRecipe.toObject();
    delete newData._id;
    Recipe.updateRecipe(req.params.id, newData, function (err, recipe) { 
        if(err){
            res.send(err);
        }
        res.json(recipe);
     });
 });

module.exports = router;