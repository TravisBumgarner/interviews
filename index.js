const express = require('express');
const db = require('./db');
const mongoose = require('mongoose');

const app = express();
const measurements = require('./routes/measurements');
const test = require('./routes/test');


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/sol2').then((m)=>{
  console.log('connected to mongo db');
}).catch((e)=>{
  console.log(e);
});


app.use('/test', test)
app.use('/measurements', measurements);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`running on port ${port}`);
})