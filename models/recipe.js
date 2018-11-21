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
RecipeSchema.index(
  { title: 'text', categories: 'text', 'ingredients.name': 'text' },
  { default_language: 'german' },
);

const Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;

module.exports.getRecipeById = id => Recipe.findById(id);

module.exports.getAllRecipes = () => Recipe.find({});

const convertSearch = (searchString) => {
  const terms = searchString.split(',');
  const mapped = terms.map(term => `"${term}"`);
  return mapped.join(' ');
};

module.exports.getCount = (search) => {
  const query = search
    ? { $text: { $search: convertSearch(search) } }
    : {};
  return Recipe.countDocuments(query);
};

module.exports.getPage = async (page, limit, search) => {
  const query = search
    ? { $text: { $search: convertSearch(search) } }
    : {};
  const recipes = await Recipe
    .find(query, { score: { $meta: 'textScore' } })
    .limit(limit)
    .skip((page - 1) * limit)
    .sort(search ? { score: { $meta: 'textScore' } } : '-createdAt')
    .select('_id title heroImage categories')
    .lean();
  return recipes.map(({ score, ...recipe }) => recipe);
};

module.exports.addRecipe = newRecipe => newRecipe.save();

module.exports.removeRecipe = id => Recipe.findOneAndRemove({ _id: id });

module.exports.updateRecipe = (id, newData) => (
  Recipe.findByIdAndUpdate(id, { $set: newData }, { upsert: true, new: true })
);
