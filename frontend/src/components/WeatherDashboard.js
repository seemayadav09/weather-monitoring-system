import React from 'react';
import { Card, CardContent, Typography, Grid, MenuItem, Select, FormControl, InputLabel, Avatar } from '@mui/material';

const WeatherDashboard = (props) => {

  const convertTemperature = (celsius) => {
    if (props.tempUnit === 'Celsius') {
      return celsius.toFixed(2) + '°C';
    } else if (props.tempUnit === 'Fahrenheit') {
      return (celsius * 9 / 5 + 32).toFixed(2) + '°F';
    } else {
      return (celsius + 273.15).toFixed(2) + 'K';
    }
  };
  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition.toLowerCase()) {
      case 'clear':
        return <span style={{ fontSize: '4rem' }}>🌞</span>;
      case 'clouds':
        return (
          <span style={{ fontSize: '4rem', color: '#a9a9a9', backgroundColor: '#fff', borderRadius: '50%' }}>
            ☁️
          </span>
        );
      case 'rain':
        return (
          <span style={{ fontSize: '4rem', color: '#1e90ff' }}>
            🌧️
          </span>
        );
      case 'snow':
        return <span style={{ fontSize: '4rem' }}>❄️</span>; 
      case 'thunderstorm':
        return <span style={{ fontSize: '4rem' }}>⛈️</span>; 
      default:
        return <span style={{ fontSize: '4rem' }}>⛅</span>;
    }
  };

  const getBackgroundColor = (weatherCondition) => {
    switch (weatherCondition.toLowerCase()) {
      case 'clear':
        return '#FFD700'; 
      case 'clouds':
        return '#D3D3D3'; 
      case 'rain':
        return '#87CEFA'; 
      case 'snow':
        return '#ADD8E6'; 
      case 'haze':
        return '#B0C4DE';
      case 'thunderstorm':
        return '#708090'; 
      case 'drizzle':
        return '#B0E0E6'; 
      default:
        return '#F0E68C'; 
    }
  };
  return (
    props.data ? (
      <div style={{ padding: '20px' }}>
        <h2 style={{ textAlign: 'center', color: '#1976d2' }}>Overview of Weather in Metro Cities</h2>

        {/* Weather Cards for each city */}
        <Grid container spacing={3}>
          {props.data.map((cityWeather, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} style={{ marginBottom: '20px' }}>
              <Card
                style={{
                  backgroundColor: getBackgroundColor(cityWeather.main),
                  color: '#000', 
                  borderRadius: '10px',
                  width: '350px', 
                  height: '250px', 
                  margin: '0 auto', 
                  padding: '10px', 
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' 
                }}
              >
                <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                    {cityWeather.city}
                  </Typography>
                  <Typography
                    variant="caption"
                    style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '1rem' }} 
                  >
                    {new Date(cityWeather.dt * 1000).toLocaleTimeString()}
                  </Typography>
                </CardContent>
                <CardContent style={{ textAlign: 'center' }}>
                  <Typography variant="h4" style={{ fontWeight: 'bold', marginTop: '-10px' }}>
                    {convertTemperature(cityWeather.temp)}
                  </Typography>
                  <Typography variant="body2" style={{ fontWeight: 'bold', fontSize: '1rem', marginTop: '5px' }}>
                    Feels like: {convertTemperature(cityWeather.feels_like)}
                  </Typography>
                </CardContent>
                <CardContent style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar aria-label="weather-icon" style={{ backgroundColor: 'transparent', fontSize: '4rem' }}>
                      {getWeatherIcon(cityWeather.main)}
                    </Avatar>
                    <Typography variant="body1" style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '1.2rem' }}>
                      {cityWeather.main}
                    </Typography>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '0.9rem' }}>
                    <Typography variant="body2" style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                      Humidity: {cityWeather.humidity}%
                    </Typography>
                    <Typography variant="body2" style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                      Wind: {cityWeather.windspeed} m/s
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    ) : (
      <div>Loading</div>
    )
  );
};

export default WeatherDashboard;
