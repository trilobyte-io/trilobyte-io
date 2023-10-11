import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(...registerables);


const RealTimeGauge = () => {

  const data = {
    datasets: [
      {
        data: [70, 30], // Values for the filled and unfilled portions of the doughnut
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(0, 0, 0, 0.2)'],
      },
    ],
  };

  const options = {
    aspectRatio: 1.5,
    cutout: '75%', // Adjust the cutout size to control the doughnut's thickness
    rotation: 270, // Rotate the chart to make it resemble a speedometer
    circumference: 180, // Set the circumference to make it a semi-circle
    tooltips: {
      enabled: false, // Disable tooltips for a cleaner appearance
    },
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  )
};


export default RealTimeGauge;