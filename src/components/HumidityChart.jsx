import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2'
ChartJS.register(...registerables);


const HumidityChart = ({ data }) => {
  console.log("DATA IN CHART COMPONENT: ",
  data)
    const chartData = {
      labels: data.map(entry => entry.time),
      datasets: [{
        label: 'Humidity',
        data: data.map(entry => entry.humidity),
        borderColor: 'green',
        fill: true,
      }],
    };

    const options = {
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