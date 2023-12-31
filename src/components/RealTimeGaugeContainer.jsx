import React, { useEffect, useState } from 'react';
import RealTimeGauge from './RealTimeGauge.jsx';
/*eslint no-unused-vars: "error"*/


const RealTimeGaugeContainer = () => {
  const [realTimeSensorData, setRealTimeSensorData] = useState({
    temperature: 0,
    humidity: 0,
    lux: 0,
  });

// eslint-disable-next-line no-unused-vars
  const [ws, setWs] = useState(null);

  const configProp = {
    temperature: {
      name: 'Temperature',
      maxValue: 100,
      color: 'rgb(251,79,79, 0.8)',
      borderColor: 'rgb(192, 192, 192)',
      symbol: '°F'
    },
    humidity: {
      name: 'Humidity',
      maxValue: 100,
      color: 'rgb(108,192,229, 0.8)',
      borderColor: 'rgb(192, 192, 192)',
      symbol: '%'
    },
    lux: {
      name: 'Lux',
      maxValue: 50000,
      color: 'rgb(251,201,61, 0.8)',
      borderColor: 'rgb(192, 192, 192)',
      symbol: 'lx'
    }
  }

useEffect(() => {
  const newWebSocket = new WebSocket('ws://localhost:3001');

  // Handle WebSocket open event
  newWebSocket.addEventListener('open', () => {
    if (newWebSocket.readyState === WebSocket.OPEN) {
      console.log('WebSocket Connection is OPEN');
    } else {
      console.log('WebSocket Connection is not OPEN');
    }
  });

  newWebSocket.addEventListener('error', (event) => {
    console.error('WebSocket Error:', event);
  });

  // Handle incoming WebSocket messages
  newWebSocket.addEventListener('message', (event) => {
    try {
      const { SHT_T, SHT_RH, TSL_lux } = JSON.parse(event.data);

      const numericTemperature = Number(SHT_T);
      const numericHumidity = Number(SHT_RH);
      const numericLux = Number(TSL_lux);


      setRealTimeSensorData({ temperature: numericTemperature, humidity: numericHumidity, lux: numericLux });
    } catch (error) {
      console.log('Error parsing WebSocket message:', error);
    }
  });


  setWs(newWebSocket);

  // Clean up the WebSocket connection when the component unmounts
  return () => {
    newWebSocket.close();
  };
}, []);


  return (
    <div className="max-w-screen-xl mx-auto lg:h-80 h-1/4 flex justify-between">
    {Object.keys(realTimeSensorData).map((data, i) =>
      <div className="w-1/3 p-4" key={i}>
        <RealTimeGauge config={configProp[data]} realTimeSensorData={realTimeSensorData[data]} />
      </div>
    )}
    </div>
  );
};

export default RealTimeGaugeContainer;
