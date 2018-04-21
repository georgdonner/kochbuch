// Get dependencies
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

const app = express();

// CORS middleware
app.use(cors());

// Get our API routes
const api = require('./server/routes/api');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Pdf routes
app.use('/pdf', require('./server/routes/pdf'));

// Recipes backup to dropbox
app.use(require('./server/routes/backup'));

// Check if the zauberwort is right
app.post('/zauberwort', (req, res) => {
  const { zauberwort } = req.body;
  if (zauberwort) {
    res.sendStatus(zauberwort === process.env.ZAUBERWORT ? 200 : 401);
  } else {
    res.status(400).send('Please provide a zauberwort in the request body.');
  }
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || 3000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`API running on localhost:${port}`));
