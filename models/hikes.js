const mongoose = require('mongoose');

const hikeSchema = mongoose.Schema({
    hikeName: String,
    description: String,
    waterToConsume: Number,
    clothingToWear: String,
});

const Hikes = mongoose.model('Hike', hikeSchema);

module.exports = Hikes;
