import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2'
ChartJS.register(...registerables);


const LuxChart = ({ data }) => {

    const chartData = {
      labels: data.map(entry => entry.time.slice(5, 10)),
      datasets: [
      {
        label: 'Lux',
        data: data.map(entry => entry.lux),
        borderColor: 'blue',
        fill: false,
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
                // Hide every 2nd tick label
                return val
              },
            }
          },
          x:
          {
            ticks: {
              callback: function(val, index) {
                // Hide every 2nd tick label
                return index % 2 === 0 ? this.getLabelForValue(val) : '';
              },
            }
          },
        }
    };

  return <Line data={chartData} options={options}  />;
}

export default LuxChart;