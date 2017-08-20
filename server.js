//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Middleware installed
app.use(bodyParser.json());
app.use(express.static('public'));

const hikingController = require('./controllers/hiking.js');
app.use('/hikes', hikingController)


//Connections to mongoose
mongoose.connect('mongodb://localhost:27017/hiker');
mongoose.connection.once('open', ()=>{
  console.log('connected to mongo');
})

app.listen(3000, () => {
  console.log('listening')
})
