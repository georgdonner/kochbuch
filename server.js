require('dotenv').config();
const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const enforce = require('express-sslify');
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

// middleware
app.use(enforce.HTTPS({
  trustProtoHeader: process.env.NODE_ENV !== 'development',
}));
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SECRET_KEY || 'yeet'],
  maxAge: 24 * 60 * 60 * 1000 * 365, // 1 year
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'build')));

// set our routes
app.use('/api', require('./routes/api'));
app.use('/pdf', require('./routes/pdf'));
app.use(require('./routes/backup'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.use(require('./routes/helpers/error-handler'));

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
