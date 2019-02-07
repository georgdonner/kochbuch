const mongoose = require('mongoose');
require('dotenv').config();

// Recipe Schema
const { Schema } = mongoose;
const RecipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: String,
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

module.exports.getAllRecipes = () => Recipe.find({}).lean();

const convertSearch = (searchString) => {
  const terms = searchString.split(',').map(str => str.trim());
  return {
    $and: terms.map(term => ({
      $or: [
        { title: { $regex: new RegExp(term, 'gi') } },
        { categories: { $regex: new RegExp(term, 'gi') } },
        { 'ingredients.name': { $regex: new RegExp(term, 'gi') } },
      ],
    })),
  };
};

module.exports.getCount = (search) => {
  const query = search
    ? convertSearch(search)
    : {};
  return Recipe.countDocuments(query);
};

module.exports.getPage = async (page, limit, search) => {
  const query = search
    ? convertSearch(search)
    : {};
  return Recipe
    .find(query)
    .limit(limit)
    .skip((page - 1) * limit)
    .select('_id title image categories')
    .sort({ createdAt: 'desc' })
    .lean();
};

module.exports.lastUpdated = async () => (
  Recipe.find().limit(1).sort({ updatedAt: -1 })
);

module.exports.addRecipe = newRecipe => newRecipe.save();

module.exports.removeRecipe = id => Recipe.findOneAndRemove({ _id: id });

module.exports.updateRecipe = (id, newData) => (
  Recipe.findByIdAndUpdate(id, { $set: newData }, { upsert: true, new: true })
);
