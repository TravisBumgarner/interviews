const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sol2').then((m)=>{
  console.log('connected to mongo db');
}).catch((e)=>{
  console.log(e);
});

const measurementSchema = new mongoose.Schema({
  year: Number,
  month: Number,
  kwh: Number,
  bill: Number,
  savings: Number,
});

const Measurement = mongoose.model('Measurement', measurementSchema);

async function createMeasurement(data){
  const measurement = new Measurement(data)
  const result = await measurement.save();
  return result;
}
createMeasurement({})

async function getMeasurements(){
  const measurements = await Measurement.find();
  console.log(measurements);
  return measurements;
}

module.exports = {
  createMeasurement,
  getMeasurements,
}