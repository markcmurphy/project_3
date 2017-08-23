//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const session = require('express-session');
const jwt = require("jsonwebtoken");
const morgan = require("morgan");


//Middleware installed
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
	  secret: "totaleclipseoftheheart",
	  resave: false,
	  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("dev"));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});


const hikingController = require('./controllers/hiking.js');
app.use('/hikes', hikingController)

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/eveningcoast';
mongoose.connect(mongoUri);

mongoose.connection.once('open', () => {
  console.log('connect to mongo')
})

app.listen(port, () => {
  console.log('listening..')
})
