import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const RealTimeGauge = ({ realTimeSensorData, config }) => {

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    circumference: 270,
    rotation: -135,
  };

  const remainingSpace = realTimeSensorData - config.maxValue

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

  const gaugeText = {
    id: 'gaugeText',
    beforeDatasetsDraw(chart) {
      const { ctx, data } = chart;
      const xCenter = chart.getDatasetMeta(0).data[0].x
      const yCenter = chart.getDatasetMeta(0).data[0].y
      const fontSize = Math.min(chart.width, chart.height) * 0.12;
      ctx.save();
      ctx.fillStyle = 'white';
      ctx.font = `${fontSize}px sans-serif`;
      ctx.textAlign = 'center';
      ctx. textBaseline = 'middle';
      ctx.fillText(data.datasets[0].data[0].toFixed(2), xCenter, yCenter);
    }
  }


  return (
  <Doughnut data={data} options={options} plugins={ [gaugeText] }/>
  );
};

export default RealTimeGauge;