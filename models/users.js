const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    token: String
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;
