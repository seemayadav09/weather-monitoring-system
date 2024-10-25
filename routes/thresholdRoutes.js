// Express.js Route to Save Thresholds
const express = require('express');
const router = express.Router();
const UserThreshold = require('../models/UserThreshold');

router.post('/', async (req, res) => {
  const { city, maxTemp, minTemp, weatherCondition } = req.body;
  try {
    const newUserThreshold = new UserThreshold({ city, maxTemp, minTemp, weatherCondition });
    await newUserThreshold.save();
    res.status(200).send(newUserThreshold);
  } catch (error) {
    res.status(500).send('Error saving threshold');
  }
});

module.exports = router;
