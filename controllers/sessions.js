const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users.js');

// authentication
// router.get('/retrieve', function(req, res){ //any route will work
// 	if (req.session.body === ){
//     console.log('worked!');
// 	} else {
//   console.log('did not work :( ');
// 	}
// });
//
// router.get('/update', function(req, res){ //any route will work
// 	req.session.anyProperty = 'changing anyProperty to this value';
// 	console.log(req.session.anyProperty);
// });

router.get('/destroy-route', function(){ //any route will work
	req.session.destroy(function(err){
		if(err){
        console.log(err);
		} else {
      console.log('session destroyed');
		}
	});
});

// //...farther down the page
// router.post('/', function(req, res){
//     User.findOne({ email: req.body.email }, function(err, foundUser){
//         if(req.body.password == foundUser.password){
//             res.send('logged in');
//         } else {
//             res.send('wrong password');
//         }
//     });
// });

// router.post('/signup', passport.authenticate('local-signup', {
//         successRedirect : '/profile', // redirect to the secure profile section
//         failureRedirect : '/signup', // redirect back to the signup page if there is an error
//         failureFlash : true // allow flash messages
//     }));

router.post('/register', (req, res, next) => {
   // hash the password

  const password = req.body.password;
	console.log(password);
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // create on object for are db entry
  const userDbEntry = {};
  userDbEntry.email = req.body.email;
  userDbEntry.password = passwordHash;

  User.create(userDbEntry, (err, user) => {
    console.log(user);
    // set up session
    req.session.message  = '';
    req.session.email = user.email;
    req.session.logged   = true;
		res.json(user);
  });
});

// router.post('/login',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login' }));


router.post('/login', (req, res, next) => {
  User.findOne({email: req.body.email}, (err, foundUser) => {

      if(foundUser){
                     //now compare hash with the password from the form
            if(bcrypt.compareSync(req.body.password, foundUser.password)){
					req.session.email = req.body.email;
					req.session.currentuser = foundUser;
					req.session.logged = true;
					console.log(req.session.email);
					console.log(foundUser);
					console.log(req.session.logged);
        	res.json(foundUser);
            } else {
              console.log('else in bcrypt compare');
              req.session.message = 'email or password are incorrect';
              res.redirect('/sessions/login')

            }

      } else {

          req.session.message = 'email or password are incorrect';
          res.redirect('/sessions/login')

      } //end of if user
  });

})

module.exports = router;
