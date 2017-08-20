const express = require('express');
const router = express.Router();
const Hikes = require('../models/hikes.js');

//Index
router.get('/', (req, res)=>{
  Hikes.find((err, foundHikes)=>{
    res.json(foundHikes);
  });
});

//Create
router.post('/', (req, res)=>{
  console.log(req.body);
  Hikes.create(req.body, (err, createdHike)=>{
    res.json(createdHike);
  });
});
//
// //Delete
// router.delete('/:id', (req, res)=>{
//   Books.findByIdAndRemove(req.params.id, (err, deletedBook)=>{
//     res.json(deletedBook);
//   })
// })
//
// //Update
// router.put('/:id', (req, res)=>{
//   Books.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedBook)=>{
//     res.json(updatedBook);
//   });
// });

module.exports = router;
