import React, { useEffect, useState } from 'react';
import RealTimeGauge from './RealTimeGauge.jsx';
/*eslint no-unused-vars: "error"*/


const RealTimeGaugeContainer = () => {
  const [realTimeSensorData, setRealTimeSensorData] = useState({
    temperature: 0,
    humidity: 0,
    lux: 0,
  });

console.log(realTimeSensorData);

// eslint-disable-next-line no-unused-vars
  const [ws, setWs] = useState(null);

  const configProp = {
    temperature: {
      maxValue: 100,
      color: 'blue'
    },
    humidity: {
      maxValue: 100,
      color: 'green'
    },
    lux: {
      maxValue: 3500,
      color: 'red'
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
      const { temperature, humidity, lux } = JSON.parse(event.data);

      const numericTemperature = Number(temperature);
      const numericHumidity = Number(humidity);
      const numericLux = Number(lux);

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
