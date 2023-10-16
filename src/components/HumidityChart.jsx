import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2'
import formatDate from '../frontend-utils/formatDate.js';
ChartJS.register(...registerables);


const HumidityChart = ({ data, timeRange }) => {




  const filterDataPoints = (dataSet, dataPoint, timeRange) => {

    if (timeRange === "pastYear") {
      return dataSet.reduce((result, entry, index) => {
        if (index % 100 === 0) {
          result.push(entry[dataPoint])
        } else {
          result.push(null);
        }
          return result;
      }, [])
    } else if (timeRange === "pastWeek" || timeRange === "pastMonth") {
      return dataSet.reduce((result, entry, index) => {
        if (index % 7 === 0) {
          result.push(entry[dataPoint])
        } else {
          result.push(null);
        }
          return result;
      }, [])
    } else {
      return dataSet.map(entry => entry[dataPoint])
    }
  }

  const chartData = {
    labels: data.map(entry => {
      return formatDate(entry.time, timeRange)
    }),
    datasets: [
      {
        label: 'Temperature',
        data: filterDataPoints(data, 'temperature', timeRange),
        borderColor: 'rgb(251,79,79)',
        spanGaps: true,
        yAxisID: 'temperature'
      },
      {
        label: 'Humidity',
        data: filterDataPoints(data, 'humidity', timeRange),
        borderColor: 'rgb(108,192,229)',
        spanGaps: true,
        yAxisID: 'humidity'
      },
      {
        label: 'Lux',
        data: filterDataPoints(data, 'lux', timeRange),
        borderColor: 'rgb(251,201,61)',
        spanGaps: true,
        yAxisID: 'lux'
      }],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'rgb(192, 192, 192)'
        }
      }
    },
    grid: {
      display: false,
    },
    elements: {
      point: {
        borderWidth: 0,
        radius: 10,
        backgroundColor: 'rgba(0,0,0,0)'
      },
      line: {
        tension: 0.2, // Adjust the line tension as needed
      },
    },
    scales: {
      temperature: {
        display: false,
        type: 'linear',
        position: 'left',
        title: {
          display: false,
          text: 'Temperature (°C)',
        },
        min: 0,
        max: 100,
      },
      humidity: {
        display: false,
        type: 'linear',
        position: 'left',
        title: {
          display: false,
          text: 'Temperature (°C)',
        },
        min: 0,
        max: 100,
      },
      lux: {
        display: false,
        type: 'linear',
        position: 'right',
        title: {
          display: false,
          text: 'Lux',
        },
        min: 0,
        max: 50000,
      },
      x: {
        grid: {
          display: false,
        },
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
        },
      },
    },
  };
  return <Line data={chartData} options={options}  />;
}

export default HumidityChart;