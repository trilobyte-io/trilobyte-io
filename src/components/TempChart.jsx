import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2'
ChartJS.register(...registerables);


const TempChart = ({ data }) => {
  console.log("DATA IN CHART COMPONENT: ",
  data)
    const chartData = {
      labels: data.map(entry => entry.id),
      datasets: [
      {
        label: 'Temperature',
        data: data.map(entry => entry.temperature),
        borderColor: 'red',
        fill: false,
      }],
    };

    const options = {
        scales: {
          yAxis: {
            min: 0,
            max: 100,
          }
        }
    };

  return <Line data={chartData} options={options}  />;
}

export default TempChart;
