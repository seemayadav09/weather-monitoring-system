// models/WeatherRecord.js
const mongoose = require('mongoose');

const weatherRecordSchema = new mongoose.Schema({
    city: String,
    main: String,
    temp: Number,
    feels_like: Number,
    humidity : Number,
    windspeed : Number,
    dt: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WeatherRecord', weatherRecordSchema);
