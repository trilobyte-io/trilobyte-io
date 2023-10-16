import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const RealTimeGauge = ({ realTimeSensorData, config }) => {


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    circumference: 270,
    rotation: -135,
    centerText: {
      display: true,
      text: '42%', // Your desired text
      color: 'black', // Text color
      fontSize: 16, // Text font size
    },
  };

  const plugins = [{
    beforeDraw: function(chart) {
     var width = chart.width,
         height = chart.height,
         ctx = chart.ctx;
         ctx.restore();
         var fontSize = (height / 160).toFixed(2);
         ctx.font = fontSize + "em sans-serif";
         ctx.textBaseline = "top";
         var text = realTimeSensorData,
         textX = Math.round((width - ctx.measureText(text).width) / 2),
         textY = height / 1.75;
         ctx.fillText(text, textX, textY);
         ctx.save();
    }
  }]

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

  return (
     <Doughnut data={data} options={options} plugins={plugins} reDraw={true}/>
  );
};

export default RealTimeGauge;