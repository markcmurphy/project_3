const express = require('express');
const router = express.Router();
const Hikes = require('../models/hikes.js');

//Index
router.get('/', (req, res)=>{
  req.session.anyProperty = 'any value';
  Hikes.find((err, foundHikes)=>{
    res.json(foundHikes);
  });
});

//Create hike
router.post('/', (req, res)=>{
  console.log(req.body);
  Hikes.create(req.body, (err, createdHike)=>{
    res.json(createdHike);
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

router.get('/retrieve', function(req, res){
	if(req.session.anyProperty === "any value"){
    console.log('worked');
  }
  else {
    console.log('did not work');
	}
});

module.exports = router;
