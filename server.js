require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// set our routes
app.use('/api', require('./routes/api'));
app.use('/pdf', require('./routes/pdf'));
app.use(require('./routes/backup'));

// Check if the zauberwort is right
app.post('/zauberwort', (req, res) => {
  const { zauberwort } = req.body;
  if (zauberwort) {
    res.sendStatus(zauberwort === process.env.ZAUBERWORT ? 200 : 401);
  } else {
    res.status(400).send('Please provide a zauberwort in the request body.');
  }
});

app.use(require('./routes/views'));

const port = process.env.PORT || 3000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server running on localhost:${port}`));
