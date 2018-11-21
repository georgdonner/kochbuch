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

module.exports.getRecipeById = (id, callback) => {
  Recipe.findById(id, callback);
};

module.exports.getAllRecipes = (callback) => {
  Recipe.find({}, callback);
};

module.exports.getCount = (callback) => {
  Recipe.countDocuments({}, callback);
};

module.exports.getPage = (page, limit, callback) => {
  Recipe
    .find({})
    .limit(limit)
    .skip((page - 1) * limit)
    .sort('-createdAt')
    .select('_id title heroImage categories')
    .exec(callback);
};

module.exports.addRecipe = (newRecipe, callback) => {
  newRecipe.save(callback);
};

module.exports.removeRecipe = (id, callback) => {
  Recipe.findOneAndRemove({ _id: id }, callback);
};

module.exports.updateRecipe = (id, newData, callback) => {
  Recipe.findByIdAndUpdate(id, { $set: newData }, { upsert: true, new: true }, callback);
};
