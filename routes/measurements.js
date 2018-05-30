var express = require('express');
var mongoose = require('mongoose');

var Measurement = require('../models/Measurement');
var router = express.Router();

router.get('/:id', (req, res, next) => {
  console.log(`get request received for ${req.params.id}`);
  Measurement.findById(req.params.id, req.body, (err, measurement) => {
    if(err) return next(err);
    res.json(measurement);
  })
});

router.get('/', (req, res, next) => {
  console.log('get request received')
  Measurement.find((err, measurements) => {
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
  console.log(`updating ${req.params.id}`);
  Measurement.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', (req, res, next) => {
  console.log(`deleting ${req.params.id}`);
  Measurement.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
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