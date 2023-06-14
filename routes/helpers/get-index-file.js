const path = require('path');
const fs = require('fs').promises;

module.exports = async (recipe) => {
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
