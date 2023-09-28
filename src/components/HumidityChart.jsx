import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2'
import formatDate from '../frontend-utils/formatDate.js';
ChartJS.register(...registerables);


const HumidityChart = ({ data, timeRange }) => {

  const filterDataPoints = (dataSet, dataPoint, timeRange) => {

    if (timeRange === "pastWeek" || timeRange === "pastMonth") {
      return dataSet.reduce((result, entry, index) => {
        if (index % 7 === 0) {
          result.push(entry[dataPoint])
        }
          return result;
      }, [])
    }
  }

  const chartData = {
    labels: data.map(entry => {
      return formatDate(entry.time, timeRange)
    }),
    datasets: [{
        label: 'Humidity',
        data: filterDataPoints(data, 'humidity', timeRange),
        borderColor: 'green',
        fill: true,
      },
      {
        label: 'Temperature',
        data: data.map(entry => entry.temperature),
        borderColor: 'blue',
        fill: true,
      },
      {
        label: 'Lux',
        data: data.map(entry => entry.lux),
        borderColor: 'red',
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
              if (timeRange === "pastDay") {
                return index % 24 === 0 ? this.getLabelForValue(val) : '';
              }
              return index % 4 === 0 ? this.getLabelForValue(val) : '';
            },
          }
        },
    },
  };

  return <Line data={chartData} options={options}  />;
}

export default HumidityChart;