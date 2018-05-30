const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

const app = express();
const measurements = require('./routes/measurements');
const test = require('./routes/test');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/sol').then((m)=>{
  console.log('connected to mongo db');
}).catch((e)=>{
  console.log(e);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use('/test', test)
app.use('/measurements', measurements);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`running on port ${port}`);
})

