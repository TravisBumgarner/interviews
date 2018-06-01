const express = require('express');
const mongoose = require('mongoose');

const Measurement = require('../models/Measurement');
const router = express.Router();

router.get('/:id', (req, res, next) => {
  Measurement.findById(req.params.id, req.body, (err, measurement) => {
    if(err) return next(err);
    res.json(measurement);
  })
});

router.get('/', (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
  Measurement.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', (req, res, next) => {
  Measurement.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
