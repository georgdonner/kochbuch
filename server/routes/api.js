var express = require('express');
var router = express.Router();

require('dotenv').config();
var mongojs = require('mongojs');
var db = mongojs(process.env.MONGODB_URI, ['recipes']);

// Get all recipes
router.get('/recipes', function (req, res, next) { 
    db.recipes.find(function (err, recipes) { 
        if(err){
            res.send(err);
        }
        res.json(recipes);
     });
 });

// Get single recipe
router.get('/recipe/:id', function (req, res, next) { 
    db.recipes.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, recipe) { 
        if(err){
            res.send(err);
        }
        res.json(recipe);
     });
 });

// Save recipe
router.post('/recipe', function (req, res, next) { 
    var recipe = req.body;
    if (!recipe.title) {
        res.status(400);
        res.json({
            "error": "No Recipe Title"
        });
    } else {
        db.recipes.save(recipe, function(err, recipe){
            if(err){
            res.send(err);
        }
        res.json(recipe);
        });
    }
 });

// Delete recipe
router.delete('/recipe/:id', function (req, res, next) { 
    db.recipes.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, recipe) { 
        if(err){
            res.send(err);
        }
        res.json(recipe);
     });
 });

// Update recipe
router.put('/recipe/:id', function (req, res, next) {
    var recipe = req.body;
    var updRecipe = {};

    if(recipe.name){
        updRecipe.name = recipe.name;
    }
    if(recipe.duration){
        updRecipe.duration = recipe.duration;
    }
    if(recipe.difficulty){
        updRecipe.difficulty = recipe.difficulty;
    }
    if(recipe.ingredients){
        updRecipe.ingredients = recipe.ingredients;
    }
    if(recipe.description){
        updRecipe.description = recipe.description;
    }

    if(!updRecipe){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.recipes.update({_id: mongojs.ObjectId(req.params.id)},updRecipe, {}, function(err, recipe) { 
            if(err){
                res.send(err);
            }
            res.json(recipe);
        });
    }
 });

module.exports = router;