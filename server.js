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

const enforceHttps = require('./server/routes/middleware/enforce-https');
const clientRoute = require('./server/routes/client');

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,
}).then((res) => {
  console.log('mongoose connected', res);
}).catch((res) => {
  console.log('mongoose failed', res);
});

const app = express();

// middleware
app.use(enforceHttps());
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SECRET_KEY],
  maxAge: 24 * 60 * 60 * 1000 * 365, // 1 year
  httpOnly: true,
  secure: true,
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(express.static(path.join(__dirname, 'server/static')));
app.use(express.static(path.join(__dirname, 'build')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// set our routes
app.use('/api', require('./server/routes/api'));
app.use('/pdf', require('./server/routes/pdf'));
app.use(require('./server/routes/backup'));

app.get('*', clientRoute);

app.use(require('./server/routes/middleware/error-handler'));

const port = process.env.PORT || 3000;
/* eslint-disable no-console */
if (process.env.NODE_ENV === 'development') {
  const certOptions = {
    key: fs.readFileSync(path.resolve('cert/server.key')),
    cert: fs.readFileSync(path.resolve('cert/server.cert')),
  };
  https
    .createServer(certOptions, app)
    .listen(port, () => console.log(`Server running on localhost:${port}`));
} else {
  app.listen(port, () => console.log(`Server running on localhost:${port}`));
}
