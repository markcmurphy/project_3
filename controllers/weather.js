const express = require('express');
const router = express.Router();
const getWeather = require('../bin/weather.js')

router.get('/byCity/:city', (req, res) => {
  console.log(req.params.city, 'req.params');
	getWeather(res, req.params.city)
  // end of weather.get byName
  });


router.post('/', (req, res) => {
  console.log(req.body.city, 'req.body')
  getWeather(res, req.body.city)
})


module.exports = router;
