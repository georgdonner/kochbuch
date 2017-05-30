var express = require('express');
var router = express.Router();

var Recipe = require('../models/recipe');
var Weekplan = require('../models/weekplan');
var Shoppinglist = require('../models/shoppinglist');

/************************RECIPES *********************/

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
        heroImage: req.body.heroImage,
        servings: req.body.servings,
        duration: req.body.duration,
        difficulty: req.body.difficulty,
        cookCount: req.body.cookCount,
        ingredients: req.body.ingredients,
        description: req.body.description,
        descrImage: req.body.descrImage,
        categories: req.body.categories
    });

    Recipe.addRecipe(newRecipe, function (err, recipe) {
        if (err) {
            res.send(err);
        }
        res.json(recipe);
    });
 });

/* Delete recipe
router.delete('/recipe/:id', function (req, res, next) {
    Recipe.removeRecipe(req.params.id, function (err, recipe) { 
        if (err) {
            res.send(err);
        }
        res.json(recipe);
     });
 });
 */

// Update recipe
router.put('/recipe/:id', function (req, res, next) {
    let updRecipe = new Recipe({
        title: req.body.title,
        heroImage: req.body.heroImage,
        servings: req.body.servings,
        duration: req.body.duration,
        difficulty: req.body.difficulty,
        cookCount: req.body.cookCount,
        ingredients: req.body.ingredients,
        description: req.body.description,
        descrImage: req.body.descrImage,
        categories: req.body.categories
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

 /********************* WEEKPLANS *********************/

 // Get weekplan
 router.get('/plan/:name', function (req, res, next) {
    Weekplan.getPlanByName(req.params.name, function (err, plan) { 
        if(err){
            res.send(err);
        }
        res.json(plan);
     });
 });

 // New weekplan
 router.post('/plans', function (req, res, next) {
     var newPlan = new Weekplan({
        name: req.body.name,
        plan: req.body.plan
     });
     
     Weekplan.addPlan(newPlan, function(err, plan) {
        if (err) {
            res.send(err);
        }
        res.json(plan);
     });
 });

 // Update weekplan
 router.put('/plan/:name', function(req, res, next) {
    var updPlan = new Weekplan({
        name: req.params.name,
        plan: req.body.plan
    });

    var newData = updPlan.toObject();
    delete newData._id;
    Weekplan.updatePlan(req.params.name, newData, function (err, plan) { 
        if(err){
            res.send(err);
        }
        res.json(plan);
     });
 });

 /************************ SHOPPING LISTS **********************/

 // Get Shopping List
 router.get('/list/:name', function (req, res, next) {  
    Shoppinglist.getListByName(req.params.name, function (err, list) {
        if (err) {
            res.send(err);
        }
        res.json(list);
    });
 });

 // New Shopping List
 router.post('/lists', function (req, res, next) {  
    var newList = new Shoppinglist({
        name: req.body.name,
        list: req.body.list
    });

    Shoppinglist.addList(newList, function (err, list) {  
        if (err) {
            res.send(err);
        }
        res.json(list);
    });
 });

 // Update Shopping List
 router.put('/list/:name', function (req, res, next) {
    var updList = new Shoppinglist({
        name: req.params.name,
        list: req.body.list
    });

    var newData = updList.toObject();
    delete newData._id;
    Shoppinglist.updateList(req.params.name, newData, function (err, list) { 
        if(err){
            res.send(err);
        }
        res.json(list);
     });
 });

module.exports = router;