require('dotenv').config();
const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const compression = require('compression');
const morgan = require('morgan');

const enforceHttps = require('./routes/helpers/enforce-https');
const getIndexFile = require('./routes/helpers/get-index-file');
const Recipe = require('./models/recipe');

mongoose.connect(process.env.MONGODB_URI);

const app = express();

// middleware
app.use(enforceHttps());
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SECRET_KEY || 'yeet'],
  maxAge: 24 * 60 * 60 * 1000 * 365, // 1 year
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'build')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// set our routes
app.use('/api', require('./routes/api'));
app.use('/pdf', require('./routes/pdf'));
app.use(require('./routes/backup'));

app.get('*', async (req, res) => {
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
});

app.use(require('./routes/helpers/error-handler'));

const port = process.env.PORT || 3000;
/* eslint-disable no-console */
if (process.env.NODE_ENV === 'development') {
  const certOptions = {
    key: fs.readFileSync(path.resolve('cert/key.pem')),
    cert: fs.readFileSync(path.resolve('cert/cert.pem')),
  };
  https
    .createServer(certOptions, app)
    .listen(port, () => console.log(`Server running on localhost:${port}`));
} else {
  app.listen(port, () => console.log(`Server running on localhost:${port}`));
}
