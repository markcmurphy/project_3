const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

// router.put('/:id', (req,res)=> {
//   User.findByIdAndUpdate(req.params.id, req.body, ()=> {
//     res.json();
//   });
// });
// //
//
// router.get('/:id/edit', (req,res)=> {
//   if(req.session.logged){
// User.findById(req.params.id,(err, foundUser)=>{
//   res.render('Users/edit.ejs', {
//     User: foundUser
//   })
// })
// } else {
//     res.redirect('/');
//   }
// });
//
// router.delete('/:id', (req,res)=> {
//   User.findByIdAndRemove(req.params.id, (err, foundUser)=>{
//     const jobIds = [];
//     for (let i=0; i<foundUser.jobs.length; i++) {
//       jobIds.push(foundUser.jobs[i]._id);
//     }
//     Job.remove(
//       {
//           _id: {
//             $in: jobIds
//           }
//       },
//       (err, data)=> {
//         res.redirect('/Users');
//       }
//     );
//   });
// });
//
// router.get('/new', (req, res) => {
//   res.render('Users/new.ejs', {
//     currentUser: req.session.currentuser
//   });
// });
//
// router.get('/', (req, res)=> {
//   User.find({}, (err, foundUsers)=> {
//       currentUser: req.session.currentuser,
//       users : foundusers,
//     });
//   })
// });
//
// router.post('/login', (req, res) => {
//   req.session.username = req.body.username;
//   req.session.logged   = true;
//   console.log(req.session);
//   res.redirect('/Users')
// });
//
// router.post('/', (req, res)=> {
//   User.create(req.body, (err, createdUser)=>{
//     res.redirect('/Users');
//   });
// });
//
//
//
router.get('/:id', (req,res)=> {
  User.findById(req.params.id, (err, foundUser)=> {
      currentUser = req.session.currentuser,
      user = foundUser
      res.json(foundUser);
    });
  });


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
