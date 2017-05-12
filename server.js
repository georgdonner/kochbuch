// Get dependencies
var express = require('express');
var path = require('path');
var cors = require('cors');
var http = require('http');
var bodyParser = require('body-parser');
require('dotenv').config();

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

var conn = mongoose.connection;
conn.on('connected', () => {
    console.log('Connected to database');
});
conn.on('error', console.error.bind(console, 'connection error:'));

var app = express();

// CORS middleware
app.use(cors());

// Get our API routes
var api = require('./server/routes/api');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));