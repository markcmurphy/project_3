const express = require('express');
const router = express.Router();
const Hikes = require('../models/hikes.js');
const getWeather = require('../bin/weather.js')
const User = require('../models/users.js');


//Index
router.get('/', (req, res)=>{
  req.session.body = 'body';
  console.log('Cookies: ', req.cookies)
  Hikes.find((err, foundHikes)=>{
    res.json(foundHikes);
  });
});



//Create hike
router.post('/', (req, res)=>{
  console.log(foundUser);
  User.findById(req.body.userId, (err, foundUser)=>{
  Hikes.create(req.body, (err, createdHike)=>{
    res.json(createdHike);
    foundUser.hikes.push(createdHike);
  });
});
});

//Delete hike
router.delete('/:id', (req, res)=>{
  Hikes.findByIdAndRemove(req.params.id, (err, deletedHike)=>{
    res.json(deletedHike);
  })
})

//Update hike
router.put('/:id', (req, res)=>{
  Hikes.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedHike)=>{
    res.json(updatedHike);
  });
});

// weather routing

router.get('/byCity/:city', (req, res) => {
  Hikes.find({ city: req.params.location }, (err, city) => {
    if ( err ) { console.log ('there is an error in hike.get /byName/:name' , err ); }
    getWeather(res, req.params.city);
	});
});




// do not edit below this line
module.exports = router;
