import React from 'react';
import WeatherDashboard from '../components/WeatherDashboard';
// import HistoricalTrends from '../components/HistoricalTrends';
import Profile from '../components/Profile';
import DailySummary from '../components/DailySummary';
import { MenuItem, Select, FormControl, InputLabel} from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import HistoricalTrend from '../components/HistoricalTrends';

function Dashboard() {
  const [temperatureUnit, setTemperatureUnit] = useState('Celsius'); // Default unit
  const [weatherData, setWeatherData] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const[historicalData, setHistoricalData] = useState([]);
  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'];

  const handleSaveThreshold = async (threshold) => {
    try {
      const response = await axios.post('http://localhost:8000/api/thresholds', threshold);
      console.log('Threshold saved:', response.data);
    } catch (error) {
      console.error('Error saving threshold:', error);
    }
  };
  const handleUnitChange = (event) => {
    setTemperatureUnit(event.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      const responses = await Promise.all(cities.map(city => axios.get(`http://localhost:8000/api/weather/${city}`)));
      const weatherDataArray = responses.map((res, index) => ({
        ...res.data,
        city: cities[index]
      }));
  
      setWeatherData(weatherDataArray);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  async function fetchDailySummaries() {
    try {
      const requests = cities.map(city =>
        axios.get(`http://localhost:8000/api/visualization/daily-summary/${city}`)
      );
      const responses = await Promise.all(requests);
      const allSummaries = responses.map(response => response.data);
      setSummaries(allSummaries);
    } catch (error) {
      console.error('Error fetching daily summaries:', error);
    }
  }
  async function fetchHistoricalData () {
    try {
      const responses = await Promise.all(cities.map(city => axios.get(`http://localhost:8000/api/visualization/historicalData/${city}`)));
      const historicalDataArray = responses.map((res, index) => ({
        ...res.data,
        city: cities[index]
      }));
  
      setHistoricalData(historicalDataArray);
    } catch (error) {
        console.error('Error fetching historical trends:', error);
    }
};
  useEffect(() => {
    fetchWeatherData();
    fetchDailySummaries();
    fetchHistoricalData()
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: '30px', textAlign: 'center', color: '#1976d2' }}>Weather Monitoring Dashboard</h1>
      <FormControl variant="outlined" style={{ marginBottom: '20px' }}>
        <InputLabel>Temperature Unit</InputLabel>
        <Select value={temperatureUnit} onChange={handleUnitChange} label="Temperature Unit">
          <MenuItem value="Celsius">Celsius</MenuItem>
          <MenuItem value="Fahrenheit">Fahrenheit</MenuItem>
          <MenuItem value="Kelvin">Kelvin</MenuItem>
        </Select>
      </FormControl>
      <WeatherDashboard data = {weatherData} tempUnit = {temperatureUnit}/>
      <DailySummary data = {summaries} tempUnit = {temperatureUnit}/>
      <Profile onSaveThreshold={handleSaveThreshold} />
      <HistoricalTrend data = {historicalData} tempUnit = {temperatureUnit}/>
    </div>
  );
}

export default Dashboard;
