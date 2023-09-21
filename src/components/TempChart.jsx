import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2'
import formatDate from '../frontend-utils/formatDate.js';
ChartJS.register(...registerables);


const TempChart = ({ data, timeRange }) => {

  const chartData = {
    labels: data.map(entry => {
      return formatDate(entry.time, timeRange)
    }),
    datasets: [{
      label: 'Temperature',
      data: data.map(entry => entry.temperature),
      borderColor: 'red',
      fill: false,
    }],
  };

    const options = {
      elements: {
        point: {
          borderWidth: 0,
          radius: 10,
          backgroundColor: 'rgba(0,0,0,0)'
        },
      },
        scales: {
          y:
          {
            min: 0,
            max: 100,

            ticks: {
              stepSize: 10,
              callback: function(val) {
                // Hide every 2nd tick label
                return val + "°F"
              },
            }
          },
          x:
          {
            ticks: {
              callback: function(val, index) {
                // Hide every 2nd tick label
                return index % 4 === 0 ? this.getLabelForValue(val) : '';
              },
            }
          },
        }
    };

  return <Line data={chartData} options={options}  />;
}

export default TempChart;
