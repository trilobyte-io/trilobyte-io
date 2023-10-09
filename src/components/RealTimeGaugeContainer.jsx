import React, { useEffect, useState } from 'react';
/*eslint no-unused-vars: "error"*/


const RealTimeGaugeContainer = () => {
  const [realTimeSensorData, setRealTimeSensorData] = useState({});
// eslint-disable-next-line no-unused-vars
  const [ws, setWs] = useState(null);

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
      const receivedSensorData = JSON.parse(event.data.toString());
      setRealTimeSensorData(receivedSensorData);
    });
    setWs(newWebSocket);
    // Clean up the WebSocket connection when the component unmounts
    return () => {
      if (newWebSocket) {
        newWebSocket.close();
      }
    };
  }, []);

  return (
    <div>
      {console.log(realTimeSensorData)}
      <p>Temperature is: {realTimeSensorData.SHT_T}</p>
      <p>Humidity is: {realTimeSensorData.SHT_RH}</p>
      <p>Lux is: {realTimeSensorData.TSL_lux}</p>
    </div>
  );
};

export default RealTimeGaugeContainer;
