import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2'
import formatDate from '../frontend-utils/formatDate.js';
ChartJS.register(...registerables);


const HumidityChart = ({ data, timeRange }) => {

  const chartData = {
    labels: data.map(entry => {
      return formatDate(entry.time, timeRange)
    }),
    datasets: [{
      label: 'Humidity',
      data: data.map(entry => entry.humidity),
      borderColor: 'green',
      fill: true,
    }],
  };

    const options = {
      elements: {
        point: {
          borderWidth: 0,
          radius: 10,
          backgroundColor: 'rgba(0,0,0,0)'
        }
      },
      scales: {
        y:
          {
            min: 0,
            max: 100,

            ticks: {
              stepSize: 10,
              callback: function(val) {
                return val + "%"
              },
            }
          },
        x:
          {
            time: {
              unit: 'hour',
              displayFormats: {
                hour: 'HH:mm',
                day: "MM/DD HH:mm"
              }
            },
            ticks: {
              callback: function(val, index) {
                // Hide every 2nd tick label
                return index % 2 === 0 ? this.getLabelForValue(val) : '';
              },
            }
          },
      },
    };

  return <Line data={chartData} options={options}  />;
}

export default HumidityChart;