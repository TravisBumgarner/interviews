const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const DB = require('./db');
const measurements = require('./routes/measurements');
const test = require('./routes/test');

const app = express();

DB.connect();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE"); // DELETE Shouldn't be here and auth should be required.
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use('/test', test);
app.use('/measurements', measurements);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

