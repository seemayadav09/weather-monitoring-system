const express = require('express');
const WeatherRecord = require('../models/WeatherRecord'); 
const router = express.Router();
const DailySummary = require('../models/DailySummary');

router.get('/daily-summary/:city', async (req, res) => {
    const { city } = req.params;
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const weatherRecords = await WeatherRecord.find({
            city: city,
            date: {
                $gte: today,
                $lt: tomorrow
            }
        });
        if (weatherRecords.length === 0) {
            return res.status(404).json({ message: 'No data found for the specified city.' });
        }
        const totalTemp = weatherRecords.reduce((acc, record) => acc + record.temp, 0).toFixed(2);
        const avgTemp = totalTemp / weatherRecords.length;
        const maxTemp = Math.max(...weatherRecords.map(record => record.temp));
        const minTemp = Math.min(...weatherRecords.map(record => record.temp));

        // Calculate average humidity
        const totalHumidity = weatherRecords.reduce((acc, record) => acc + record.humidity, 0).toFixed(2);
        const avgHumidity = totalHumidity / weatherRecords.length;

        // Calculate average wind speed
        const totalWindSpeed = weatherRecords.reduce((acc, record) => acc + record.windspeed, 0).toFixed(2);
        const avgWindSpeed = totalWindSpeed / (weatherRecords.length);

        // Determine dominant weather condition
        const conditionCount = {};
        weatherRecords.forEach(record => {
            conditionCount[record.main] = (conditionCount[record.main] || 0) + 1;
        });

        const dominantCondition = Object.keys(conditionCount).reduce((a, b) =>
            conditionCount[a] > conditionCount[b] ? a : b
        );
        const dailySummary = new DailySummary({
            city: city,
            date: new Date(), // today's date
            avgTemp: parseFloat(avgTemp.toFixed(2)),
            maxTemp: maxTemp,
            minTemp: minTemp,
            avgHumidity: parseFloat(avgHumidity.toFixed(2)), // Add avgHumidity
            avgWindSpeed: parseFloat(avgWindSpeed.toFixed(2)), // Add avgWindSpeed
            dominantWeather: dominantCondition
        });

        await dailySummary.save();
        res.json(dailySummary);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching daily summary', error: error.message });
    }
});

router.get('/historicalData/:city', async (req, res) => {
    const { city } = req.params;
    const currentTime = Math.floor(Date.now() / 1000); // Current UNIX timestamp
    const past30Days = currentTime - (30 * 24 * 60 * 60); // 30 days ago in seconds

    try {
        const weatherHistory = await WeatherRecord.aggregate([
            {
                $match: {
                    city,
                    dt: { $gte: past30Days, $lte: currentTime } // Filter records in the last 30 days
                }
            },
            {
                $group: {
                    _id: {
                        $dayOfMonth: { $toDate: { $multiply: ['$dt', 1000] } } // Group by day
                    },
                    avgTemp: { $avg: '$temp' } // Calculate average temperature for the day
                }
            },
            { $sort: { '_id': 1 } } // Sort by day (ascending)
        ]);

        if (weatherHistory.length === 0) {
            return res.status(404).json({ message: `No weather data found for ${city} in the last 30 days` });
        }

        res.json(weatherHistory);
    } catch (error) {
        console.error(`Error fetching historical data for ${city}:`, error.message);
        res.status(500).json({ message: 'Server error. Could not retrieve data.' });
    }
});

module.exports = router;
