# 🌦️ Weather Monitoring System

A **Weather Monitoring System** to visualize and monitor real-time weather data across cities, with features for setting user-defined thresholds, viewing daily summary, viewing historical trends, and generating alerts. This system offers a customizable dashboard and daily weather summaries to keep users informed of weather conditions.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

- **Real-Time Weather Summary**  
  Displays key metrics for each city:
  - Average, maximum, and minimum temperatures
  - Wind speed and humidity
  - Dominant weather condition icons (e.g., clear, rain, clouds)

- **Temperature Unit Conversion**  
  Toggle between Celsius, Fahrenheit, and Kelvin.

- **User-Defined Alerts**  
  Set threshold alerts on temperature and weather conditions for each city; notifications are triggered when thresholds are breached.

- **Historical Weather Trends**  
  Visualize temperature trends for the past 30 days, including daily averages for metro cities.

- **Customizable Dashboard**  
  Responsive UI with colored temperature cards and weather icons.

---

## Tech Stack

- **Frontend**: React.js, Material-UI
- **Backend**: Node.js, Express
- **API**: OpenWeatherMap for real-time weather data
- **Database**: MongoDB for storing configurations and historical data

---

## Installation

### Prerequisites

Ensure you have installed:
- Node.js
- npm or yarn
- MongoDB (or use a cloud-based MongoDB service)
- OpenWeatherMap API Key

### Setup Steps

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/yourusername/weather-monitoring-system.git
   cd weather-monitoring-system
   ```

2. **Backend Configuration**  
   - Navigate to `root directory` and install dependencies:
     ```bash
     npm install
     ```
   - Configure environment variables by creating a `.env` file in the `backend` directory:
     ```bash
     OPENWEATHER_API_KEY=your_api_key
     PORT=8000
     MONGO_URI=your_mongo_db_uri
     ```

3. **Frontend Configuration**  
   - Navigate to `frontend` and install dependencies:
     ```bash
     cd ../frontend
     npm install
     ```

4. **Run the Development Servers**  
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend server:
     ```bash
     cd ../frontend
     npm start
     ```

   - Access the application at `http://localhost:3000`, with the backend running on `http://localhost:8000`.

---

## Usage

### Viewing the Dashboard
1. Open the application in your browser at `http://localhost:3000`.
2. Switch between temperature units (Celsius, Fahrenheit, Kelvin) using the dropdown in the UI.
3. View the daily weather summaries, with icons representing each city's dominant weather condition.

### Setting Threshold Alerts
1. Click on the profile icon (top-right of the dashboard).
2. Choose **"Set Thresholds"** and fill in city name, max/min temperatures, and weather conditions (e.g., rain, clear).
3. The system checks threshold breaches every 5 minutes, triggering alerts if the conditions are met(user get email notification too).

### Visualizing Historical Trends
1. Visit the "Historical Trends" section to view temperature variations for metro cities over the past 30 days, visualized on line graphs.

---

## Configuration

- **OpenWeatherMap API**: Configure the API key in the `.env` file in the `backend` folder.
- **Temperature Units**: The frontend UI supports toggling between Celsius, Fahrenheit, and Kelvin.

### Example `.env` File

```bash
OPENWEATHER_API_KEY=your_api_key
PORT=8000
MONGO_URI=mongodb://localhost:27017/weather-monitoring
```

---

## Future Enhancements

- Enhanced visualizations (e.g., bar charts, additional metrics)
- Mobile responsiveness improvements
- Support for more cities and longer historical data range
- User authentication for personalized settings

---

## Contributing

Contributions are welcome! Follow these steps to get started:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request

---

## License

This project is licensed under the MIT License.

---

## Contact

For inquiries or feedback, contact the project maintainer:

- **Name**: Seema Yadav
- **Email**: seemayadav982002@gmail.com
- **LinkedIn**: [Seema Yadav](https://www.linkedin.com/in/seemayadav09/)

---
