import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Avatar } from '@mui/material';

function DailySummary(props) {

  const convertTemperature = (celsius) => {
    if (props.tempUnit === 'Celsius') {
      return celsius.toFixed(2) + '°C';
    } else if (props.tempUnit === 'Fahrenheit') {
      return (celsius * 9 / 5 + 32).toFixed(2) + '°F';
    } else {
      return (celsius + 273.15).toFixed(2) + 'K';
    }
  };

  // Function to get weather icon based on condition
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
  const getBackgroundColor = (condition) => {
    switch (condition) {
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
        <h2 style={{ textAlign: 'center', color: '#1976d2' }}>Today's Weather Summaries</h2>
        <Grid container spacing={3}>
          {props.data.map((summary, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                style={{
                  backgroundColor: getBackgroundColor(summary.dominantWeather),
                  color: '#000',
                  borderRadius: '10px',
                  width: '350px',
                  height: '300px',
                  margin: '0 auto',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
              >
                <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                    {`${summary.city}`}
                  </Typography>
                  <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                    {new Date().toLocaleTimeString()}
                  </Typography>
                </CardContent>
                <CardContent style={{ textAlign: 'center' }}>
                  <Typography variant="body1" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                    Average Temp: {convertTemperature(summary.avgTemp)}
                  </Typography>
                  <Typography variant="body2" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                    Max Temp: {convertTemperature(summary.maxTemp)}
                  </Typography>
                  <Typography variant="body2" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                    Min Temp: {convertTemperature(summary.minTemp)}
                  </Typography>
                </CardContent>
                <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar aria-label="weather-icon" style={{ backgroundColor: 'transparent', fontSize: '4rem' }}>
                      {getWeatherIcon(summary.dominantWeather)}
                    </Avatar>
                    <Typography variant="body1" style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '1rem' }}>
                      {summary.dominantWeather}
                    </Typography>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '0.8rem' }}>
                  <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                      Avg Wind Speed: {summary.avgWindSpeed} m/s
                    </Typography>
                    <Typography variant="body2" style={{ marginBottom: '4px', fontWeight: 'bold' }}>
                      Avg Humidity: {summary.avgHumidity}%
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    ) : <div>Loading</div>
  );
}

export default DailySummary;
