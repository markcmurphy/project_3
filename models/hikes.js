const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./users.js');

const hikeSchema = mongoose.Schema({
    hikeName: String,
    location: String,
    weather: String,
    description: String
});

const Hikes = mongoose.model('Hike', hikeSchema);

module.exports = Hikes;
