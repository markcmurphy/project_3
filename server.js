//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const session = require('express-session');
require('dotenv').config();


//Middleware installed
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(session({
	  secret: "totaleclipse",
	  resave: false,
	  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const hikingController = require('./controllers/hiking.js');
app.use('/hikes', hikingController)

const weather = require('./controllers/weather.js');
app.use('/weather', weather);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

const usersController = require('./controllers/users.js');
app.use('/users', usersController);

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/eveningcoast';
mongoose.connect(mongoUri);

mongoose.connection.once('open', () => {
  console.log('connect to mongo')
})

app.listen(port, () => {
  console.log('listening..')
})
