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

  const plugins = [
    {
      beforeDraw: function(chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;

        // Retrieve and format your dynamic data
        var rawDynamicData= realTimeSensorData
        var dynamicData = rawDynamicData.toFixed(2); // Replace with your dynamic data source

        ctx.restore();
        var fontSize = (height / 160).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle"; // Adjust text vertical alignment
        ctx.fillStyle = "white";
        var textX = Math.round((width - ctx.measureText(dynamicData).width) / 2);
        var textY = height / 1.65;
        ctx.fillText(dynamicData, textX, textY);
        chart.update();
        ctx.save();
      }
    }
  ];

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