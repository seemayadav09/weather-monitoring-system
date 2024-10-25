const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const weatherRoutes = require('./routes/weatherRoutes');
const dotenv = require('dotenv');
const axios = require('axios');
const { Server } = require('socket.io');
const UserThreshold = require('./models/UserThreshold');
const WeatherRecord = require('./models/WeatherRecord');
const thresholdRoutes = require('./routes/thresholdRoutes');
const visualizationRoutes = require('./routes/visualizationRoutes');
const cors = require('cors')
const nodemailer = require('nodemailer');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

// MongoDB Connection
mongoose.connect(`mongodb+srv://${process.env.user}:${process.env.password}@weathermonitoring.z2lha.mongodb.net/?retryWrites=true&w=majority&appName=weathermonitoring`)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use('/api/weather', weatherRoutes);
app.use('/api/visualization', visualizationRoutes);
app.use('/api/thresholds', thresholdRoutes);

function kelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(2);
}

async function startFetchingWeatherData() {
    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
    const fetchInterval = process.env.FETCH_INTERVAL || 300000; // default to 5 minutes

    setInterval(async () => {
        for (const city of cities) {
            try {
                // Fetch weather data from OpenWeatherMap API
                const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`);
                const weatherData = response.data;
                const tempInCelsius = kelvinToCelsius(weatherData.main.temp);
                const feelsLikeInCelsius = kelvinToCelsius(weatherData.main.feels_like);
                const weatherRecord = new WeatherRecord({
                    city,
                    main: weatherData.weather[0].main,
                    temp: tempInCelsius,
                    feels_like: feelsLikeInCelsius,
                    humidity : weatherData.main.humidity,
                    windspeed : weatherData.wind.speed,
                    dt: weatherData.dt
                });
                await weatherRecord.save();

                console.log(`Fetched weather for ${city}: Temp = ${tempInCelsius}°C`);

                checkThresholds(city);
            } catch (error) {
                console.error(`Error fetching weather data for ${city}:`, error.message);
            }
        }
    }, fetchInterval);
}

async function checkThresholds(city) {
        try {
            const latestRecords = await WeatherRecord.find({ city })
                .sort({ dt: -1 })
                .limit(2);

            if (latestRecords.length < 2) {
                console.log(`Not enough records for ${city} to compare thresholds`);
                return; 
            }

            const [latest, secondLatest] = latestRecords;
            const thresholds = await UserThreshold.find({ city });

            for (const threshold of thresholds) {
                if (
                    latest.temp > threshold.maxTemp && secondLatest.temp > threshold.maxTemp
                ) {
                    triggerAlert(city, 'Temperature exceeded maximum threshold');
                }
                if (
                    latest.temp < threshold.minTemp && secondLatest.temp < threshold.minTemp
                ) {
                    triggerAlert(city, 'Temperature fell below minimum threshold');
                }
                if (
                    latest.main === threshold.weatherCondition &&
                    secondLatest.main === threshold.weatherCondition
                ) {
                    triggerAlert(city, 'Weather condition matched threshold for two consecutive updates');
                }
            }
        } catch (error) {
            console.error(`Error checking thresholds for ${city}:`, error.message);
        }

}
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
    },
});

const triggerAlert = (city, message) => {
    console.log(`ALERT for ${city}: ${message}`);
    io.emit('alert', { city, message });
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender's email
        to: process.env.NOTIFICATION_EMAIL, // Recipient's email
        subject: `Weather Alert for ${city}`,
        text: `ALERT for ${city}: ${message}`, // Email body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error('Error sending email:', error);
        }
        console.log('Email sent:', info.response);
    });
};

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    startFetchingWeatherData();
});
io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
