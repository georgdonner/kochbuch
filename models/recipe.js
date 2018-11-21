const mongoose = require('mongoose');
require('dotenv').config();

// Recipe Schema
const { Schema } = mongoose;
const RecipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  heroImage: String,
  servings: Number,
  duration: Number,
  difficulty: Number,
  cookCount: Number,
  ingredients: [{
    name: String,
    hint: String,
  }],
  description: String,
  descrImage: String,
  categories: [String],
},
{ timestamps: true },
);

const Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;

module.exports.getRecipeById = id => Recipe.findById(id);

module.exports.getAllRecipes = () => Recipe.find({});

module.exports.getCount = () => Recipe.countDocuments({});

module.exports.getPage = (page, limit) => (
  Recipe
    .find({})
    .limit(limit)
    .skip((page - 1) * limit)
    .sort('-createdAt')
    .select('_id title heroImage categories')
);

module.exports.addRecipe = newRecipe => newRecipe.save();

module.exports.removeRecipe = id => Recipe.findOneAndRemove({ _id: id });

module.exports.updateRecipe = (id, newData) => (
  Recipe.findByIdAndUpdate(id, { $set: newData }, { upsert: true, new: true })
);
