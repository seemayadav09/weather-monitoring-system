import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const HistoricalTrend = ({ data, tempUnit }) => {
  const convertTemperature = (celsius) => {
    if (tempUnit === 'Celsius') return celsius;
    if (tempUnit === 'Fahrenheit') return celsius * 9 / 5 + 32;
    return celsius + 273.15; // Convert to Kelvin
  };

  const generateChartData = (city, records) => ({
    labels: Object.keys(records).filter(key => key !== 'city').map((_, i) => `Day ${i + 1}`),
    datasets: [{
      label: `${city} Temperature (${tempUnit})`,
      data: Object.keys(records).filter(key => key !== 'city').map(key => convertTemperature(records[key].avgTemp)), 
      fill: false,
      borderColor: 'rgba(75,192,192,1)',
      tension: 0.1
    }]
  });

  const chartOptions = {
    scales: {
      x: { title: { display: true, text: 'Day' } },
      y: { title: { display: true, text: `Temperature (${tempUnit})` } }
    }
  };

  if (!data || data.length === 0) {
    return <div>No historical data available.</div>;
  }

  return (
    <div>
      <h2>Metro Cities Temperature Trends</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {data.map((cityData, index) => (
          <div key={index}>
            <h3>{cityData.city}</h3>
            <Line data={generateChartData(cityData.city, cityData)} options={chartOptions} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoricalTrend;
