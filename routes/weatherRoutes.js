const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15.toFixed(2);
}
router.get('/:city', async (req, res) => {
    const city = req.params.city;
    const apiKey = process.env.API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await axios.get(url);
        const weatherData = response.data;
        const tempInCelsius = kelvinToCelsius(weatherData.main.temp);
        const feelsLikeInCelsius = kelvinToCelsius(weatherData.main.feels_like)
        const weatherSummary = {
            main: weatherData.weather[0].main,
            temp: tempInCelsius,
            feels_like: feelsLikeInCelsius,
            humidity : weatherData.main.humidity,
            windspeed : weatherData.wind.speed,
            dt: weatherData.dt
        };
        res.json(weatherSummary);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
});

module.exports = router;
