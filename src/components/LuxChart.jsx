// import React from 'react';
// import { Chart as ChartJS, registerables } from 'chart.js';
// import { Line } from 'react-chartjs-2'
// import formatDate from '../frontend-utils/formatDate.js';

// ChartJS.register(...registerables);


// const LuxChart = ({ data, timeRange }) => {

//   const chartData = {
//     labels: data.map(entry => {
//       return formatDate(entry.time, timeRange)
//     }),
//     datasets: [
//     {
//       label: 'Lux',
//       data: data.map(entry => entry.lux),
//       borderColor: 'blue',
//       fill: false,
//     }],
//   };

//   const options = {
//     elements: {
//       point: {
//         borderWidth: 0,
//         radius: 10,
//         backgroundColor: 'rgba(0,0,0,0)'
//       },
//     },
//       scales: {
//         y:
//         {
//           min: 0,
//           max: 3000,
//           ticks: {
//             stepSize: 10,
//             callback: function(val) {
//               // Hide every 2nd tick label
//               return val
//             },
//           }
//         },
//         x:
//         {
//           ticks: {
//             callback: function(val, index) {
//               // Hide every 2nd tick label
//               if (timeRange === "pastDay") {
//                 return index % 24 === 0 ? this.getLabelForValue(val) : '';
//               }
//               return index % 4 === 0 ? this.getLabelForValue(val) : '';
//             },
//           }
//         },
//       }
//   };

//   return <Line data={chartData} options={options}  />;
// }

// export default LuxChart;


import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const LuxChart = () => {
  // Sample data for temperature and lux
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [20, 22, 25, 23, 27, 26],
        yAxisID: 'temperature',
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
      },
      {
        label: 'Lux',
        data: [1000, 1200, 1500, 1100, 1800, 1700],
        yAxisID: 'lux',
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
      },
    ],
  };

  // Options for the chart
  const options = {
    scales: {
      temperature: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
        min: 0,
        max: 100,
      },
      lux: {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Lux',
        },
        min: 0,
        max: 3000,
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LuxChart;