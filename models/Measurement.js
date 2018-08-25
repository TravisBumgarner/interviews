const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
  year: Number,
  month: Number,
  kwh: Number,
  bill: Number,
  savings: Number,
});

module.exports = mongoose.model('Measurement', measurementSchema);
