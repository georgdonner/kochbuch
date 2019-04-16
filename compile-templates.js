const fs = require('fs');
const pug = require('pug');

// compile recipe template
const fnString = pug.compileFileClient('views/recipe.pug', {
  compileDebug: false,
});
fs.writeFileSync('static/scripts/recipe-template.js', fnString);
