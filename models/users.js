const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Hike = require('./hikes.js')

const userSchema = Schema({
    email: String,
    password: String,
    hikes: [Hike.schema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
