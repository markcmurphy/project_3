const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Hike = require('./hikes.js')

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    hikes: []
});

const User = mongoose.model('User', userSchema);

module.exports = User;
