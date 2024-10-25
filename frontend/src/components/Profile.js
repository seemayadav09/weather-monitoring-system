import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Modal, TextField, Button, Select, FormControl, InputLabel } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const weatherConditions = ['Rain', 'Clouds', 'Clear', 'Thunderstorm', 'Haze', 'Dust', 'Sand', 'Mist'];

const Profile = ({ onSaveThreshold }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [city, setCity] = useState('');
  const [maxTemp, setMaxTemp] = useState('');
  const [minTemp, setMinTemp] = useState('');
  const [weatherCondition, setWeatherCondition] = useState('');
  const [humidity, setHumidity] = useState(''); 
  const [windSpeed, setWindSpeed] = useState('');

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSetThreshold = () => {
    setOpenModal(true);
    handleClose();
  };

  const handleSubmit = () => {
    onSaveThreshold({ city, maxTemp, minTemp, weatherCondition, humidity, windSpeed });
    setCity('');
    setMaxTemp('');
    setMinTemp('');
    setWeatherCondition('');
    setHumidity('');
    setWindSpeed('');
    setOpenModal(false);
  };

  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
      <IconButton onClick={handleClick}>
        <AccountCircleOutlinedIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleSetThreshold}>Set Thresholds</MenuItem>
      </Menu>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '10px', margin: '10% auto', width: '400px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
          <h3>Set Thresholds</h3>
          <FormControl fullWidth style={{ marginBottom: '10px' }}>
            <Select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              variant="outlined"
              style={{ borderRadius: '5px'}}
              displayEmpty
            >
              <MenuItem value="">
                <em>Select City</em> 
              </MenuItem>
              {cities.map((city) => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            value={maxTemp}
            onChange={(e) => setMaxTemp(e.target.value)}
            fullWidth
            style={{ marginBottom: '10px', borderRadius: '5px' }}
            InputProps={{
              style: { fontWeight: 'bold' },
              placeholder: "Max Temperature (°C)", 
            }}
          />
          <TextField
            value={minTemp}
            onChange={(e) => setMinTemp(e.target.value)}
            fullWidth
            style={{ marginBottom: '10px', borderRadius: '5px'}}
            InputProps={{
              style: { fontWeight: 'bold' }, 
              placeholder: "Min Temperature (°C)", 
            }}
          />
          <FormControl fullWidth style={{ marginBottom: '10px' }}>
            <Select
              value={weatherCondition}
              onChange={(e) => setWeatherCondition(e.target.value)}
              variant="outlined"
              style={{ borderRadius: '5px'}}
              displayEmpty
            >
              <MenuItem value="">
                <em>Select Weather Condition</em> 
              </MenuItem>
              {weatherConditions.map((condition) => (
                <MenuItem key={condition} value={condition}>{condition}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
            fullWidth
            style={{ marginBottom: '10px', borderRadius: '5px' }}
            InputProps={{
              style: { fontWeight: 'bold' }, 
              placeholder: "Humidity (%)",
            }}
          />

          {/* Wind Speed Input */}
          <TextField
            value={windSpeed}
            onChange={(e) => setWindSpeed(e.target.value)}
            fullWidth
            style={{ marginBottom: '10px', borderRadius: '5px' }}
            InputProps={{
              style: { fontWeight: 'bold' }, 
              placeholder: "Wind Speed (m/s)", 
            }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{
              marginTop: '10px',
              borderRadius: '5px',
              fontWeight: 'bold',
              padding: '10px 20px',
            }}
          >
            Submit
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
