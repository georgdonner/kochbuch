const path = require('path');
const fs = require('fs').promises;

const Recipe = require('../models/recipe');

const getIndexFile = async (recipe) => {
  let content = await fs.readFile(path.resolve('build', 'index.html'), { encoding: 'utf-8' });
  const title = recipe?.title || 'Kochbuch';
  content = content.replace('Kochbuch', title);
  content = content.replace('__OG_TITLE__', title);
  if (recipe?.image) {
    content = content.replace(
      /property="og:image" content=".*?"/,
      `property="og:image" content="${recipe.image.replace(/\d+.jpg/, '800.jpg')}"`,
    );
  }
  return content;
};

module.exports = async (req, res) => {
  const match = req.path.match(/^\/recipe\/(\w+)$/);
  let recipe;
  if (match) {
    const recipeId = match[1];
    recipe = await Recipe.getRecipeById(recipeId);
  }
  const content = await getIndexFile(recipe);
  res.type('text/html');
  res.status(200);
  return res.send(content);
};
