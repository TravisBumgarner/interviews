var express = require('express');
var mongoose = require('mongoose');

var Measurement = require('../models/Measurement');
var router = express.Router();

router.get('/', (req, res, next) => {
  console.log('get request received')
  Measurement.find( (err, measurements) => {
    if(err) return next(err);
    res.json(measurements);
  })
});

router.post('/', (req, res, next) => {
  Measurement.create(req.body, (err, post) => {
    if(err) return next(err);
    res.json(post);
  });
});

router.put('/:id', (req, res) => {
  res.send(`update measurement ${req.params.id}`)
});

router.delete('/:id', (req, res) => {
  res.send(`delete measurement ${req.params.id}`)
});

module.exports = router;



// async function createMeasurement(data){
//   const measurement = new Measurement(data)
//   const result = await measurement.save();
//   return result;
// }
// createMeasurement({})

// async function getMeasurements(){
//   const measurements = await Measurement.find();
//   console.log(measurements);
//   return measurements;
// }

// module.exports = {
//   createMeasurement,
//   getMeasurements,
// }