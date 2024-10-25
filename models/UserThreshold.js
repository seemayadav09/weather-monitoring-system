const mongoose = require('mongoose');

const UserThresholdSchema = new mongoose.Schema({
    city: String,
    maxTemp: Number, 
    minTemp: Number,
    weatherCondition: String,
    userId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('UserThreshold', UserThresholdSchema);
