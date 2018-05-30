var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

router.get('/', (req, res) => {
  console.log('get request received')
  const results = db.getMeasurements();
  console.log('results', results);
  return res.send(results);
});

router.post('/', (req, res) => {
  console.log('post request received');
  const result = db.createMeasurement({year: 2010});
  res.send(result);
});

router.put('/:id', (req, res) => {
  res.send(`update measurement ${req.params.id}`)
});

router.delete('/:id', (req, res) => {
  res.send(`delete measurement ${req.params.id}`)
});

module.exports = router;