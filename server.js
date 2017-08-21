//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
require('dotenv').config()


//Middleware installed
app.use(bodyParser.json());
app.use(express.static('public'));

const hikingController = require('./controllers/hiking.js');
app.use('/hikes', hikingController)

const weather = require('./controllers/weather.js');
app.use('/weather', weather);

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/eveningcoast';
mongoose.connect(mongoUri);

mongoose.connection.once('open', () => {
  console.log('connect to mongo')
})

app.listen(port, () => {
  console.log('listening..')
})
