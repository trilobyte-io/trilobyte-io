// import "chart.js";

// const TempHumidityChart = ({ data }) => {

//   const cfg = {
//     type: 'line',
//     data: {
//       datasets: [{
//         data: [{x: '2016-12-25', y: 20}, {x: '2016-12-26', y: 10}]
//       }]
//     }
//   }

// console.log(data)
//   return (
//   <div>
//     {data.map(el => el.humidity)}
//   </div>
//   )
// }

// export default TempHumidityChart;

import React, { useEffect, useRef } from 'react';
import {Chart} from 'chart.js';

function TempHumidityChart({ data }) {
  const chartRef = useRef();

  useEffect(() => {
    const myChartRef = chartRef.current.getContext('2d');

    new Chart(myChartRef, {
      type: 'line',
      data: {
        labels: data.map(entry => entry.label),
        datasets: [{
          label: 'My Line Graph',
          data: data.map(entry => entry.value),
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
        }],
      },
      options: {
        // Customize options as needed
      }
    });
  }, [data]);

  return <canvas ref={chartRef} />;
}

export default TempHumidityChart;
