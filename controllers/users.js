const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

router.get('/retrieve', function(req, res){ //any route will work
	if (req.session.body === "body"){
    console.log('worked!');
	} else {
  console.log('did not work :( ');
	}
});

//...farther down the page
router.post('/', function(req, res){
  console.log('router.post for users works');
    User.create(req.body, function(err, createdUser){
        res.redirect('/');
    });
});

module.exports = router;
