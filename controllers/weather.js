const express = require('express');
const router = express.Router();
const getWeather = require('../bin/weather.js')

router.get('/', (req, res) => {
  getWeather(res, 'austin')
})

router.post('/', (req, res) => {
  console.log(req.body.city, 'req.body')
  getWeather(res, req.body.city)
})


module.exports = router;
