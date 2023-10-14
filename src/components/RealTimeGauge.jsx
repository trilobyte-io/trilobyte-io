import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const RealTimeGauge = ({ realTimeSensorData, config }) => {

  console.log(realTimeSensorData)

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    circumference: 270,
    rotation: -135
  };
  console.log(typeof(realTimeSensorData))
  const remainingSpace = realTimeSensorData - config.maxValue
  console.log(typeof(config.maxValue))


  const data = {
    labels: ['Red', 'Blue'],
    datasets: [
      {
        label: '# of Votes',
        data: [realTimeSensorData, remainingSpace],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
     <Doughnut data={data} options={options}/>
  );
};

export default RealTimeGauge;