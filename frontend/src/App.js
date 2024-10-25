import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/Dashboard';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

function App() {
  useEffect(() => {
    const socket = io('http://localhost:8000');

    socket.on('alert', (data) => {
      const { city, message } = data;
      alert(`ALERT for ${city}: ${message}`);
      console.log(`ALERT for ${city}: ${message}`);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className='App'>
      <Dashboard/>
    </div>
  );
}

export default App;
