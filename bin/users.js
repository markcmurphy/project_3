const express = require('express');
const User = require('../models/users.js')
const userPush = (res, createdHike) => {
  // res.send(createdHike);
  console.log("these are user.hikes " + User.hikes);
    // User.hikes.push(createdHike);
    };

// end of const getWeather


module.exports = userPush;
