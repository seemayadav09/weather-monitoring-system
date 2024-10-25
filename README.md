Weather Monitoring System :
A Weather Monitoring System that displays real-time weather data for various cities. The system includes daily weather summaries, visualizes historical trends, and allows users to configure temperature, humidity, wind speed and weather condition thresholds to trigger alerts.

Features
Daily Weather Summary: Displays real-time weather summaries for different cities, including average, maximum, and minimum temperatures, wind speed, humidity, and dominant weather conditions.
Temperature Unit Conversion: Option to display temperatures in Celsius, Fahrenheit, or Kelvin.
Weather Condition Icons: Dynamic weather icons based on the dominant weather condition (e.g., clear, rain, clouds, snow).
Historical Weather Trends: Visualizes weather trends for the last 30 days using line graphs for metro cities.
User-Defined Threshold Alerts: Users can set thresholds for temperature and weather conditions for each city, triggering alerts (e.g., email or console) when thresholds are breached.
Customizable Dashboard: Responsive and visually appealing UI with temperature cards and weather icons.
Tech Stack
Frontend: React.js, Material-UI
Backend: Node.js, Express
API: OpenWeatherMap API for real-time weather data
Database: MongoDB for storing threshold configurations and historical data
Deployment: Vercel
Installation
Prerequisites
Ensure that you have the following installed:

Node.js
npm or yarn
MongoDB (or use a cloud-based MongoDB service)
OpenWeatherMap API key
Setup
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/weather-monitoring-system.git
cd weather-monitoring-system
Backend Setup:

Navigate to the backend folder and install dependencies:

bash
Copy code
cd backend
npm install
Create a .env file in the backend directory and add your OpenWeatherMap API key:

bash
Copy code
OPENWEATHER_API_KEY=your_api_key
PORT=8000
MONGO_URI=your_mongo_db_uri
Frontend Setup:

Navigate to the frontend folder and install dependencies:

bash
Copy code
cd ../frontend
npm install
Start the Development Servers:

To start the backend server:

bash
Copy code
cd backend
npm start
To start the frontend server:

bash
Copy code
cd ../frontend
npm start
The frontend will be accessible at http://localhost:3000, and the backend will run on http://localhost:8000.

Usage
Viewing the Dashboard
Open the application in your browser at http://localhost:3000.
The dashboard will display real-time weather summaries for various cities.
Switch between temperature units (Celsius, Fahrenheit, Kelvin) using the dropdown in the UI.
Setting Threshold Alerts
Click on the profile icon on the top right of the dashboard.
Select "Set Thresholds" from the dropdown menu.
Fill out the form with the city name, maximum and minimum temperature, and weather conditions (e.g., rain, clear).
The system will check if the thresholds are breached every 5 minutes, and an alert will be triggered if the condition is met.
Visualizing Historical Trends
Go to the "Historical Trends" section.
View temperature variations over the past 30 days for metro cities on line graphs.
Configuration
Weather API: The system uses the OpenWeatherMap API. You can configure the API key in the .env file located in the backend folder.
Temperature Units: The frontend allows users to toggle between Celsius, Fahrenheit, and Kelvin.
Example .env File
bash
Copy code
OPENWEATHER_API_KEY=your_api_key
PORT=8000
MONGO_URI=mongodb://localhost:27017/weather-monitoring
Future Enhancements
Add more cities and extend the historical data range.
Add user authentication for personalized settings.

Contributing
Contributions are welcome! Feel free to submit issues or pull requests for enhancements and fixes.

Fork the repository
Create a new branch (git checkout -b feature-branch)
Make your changes
Commit your changes (git commit -m 'Add feature')
Push to the branch (git push origin feature-branch)
Open a pull request
License
This project is licensed under the MIT License.

Contact
For any inquiries or questions, feel free to contact the project maintainer:

Name: Seema Yadav
Email: seemayadav982002@gmail.com
