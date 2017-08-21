const express = require('express');
const router = express.Router();
const getWeather = require('../bin/weather.js')

//
router.get('/', (req, res) => {
  getWeather(res, 'austin')
})

module.exports = router;
