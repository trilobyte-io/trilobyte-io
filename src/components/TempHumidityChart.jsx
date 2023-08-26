import "chart.js";

const TempHumidityChart = ({ data }) => {

  const cfg = {
    type: 'line',
    data: {
      datasets: [{
        data: [{x: '2016-12-25', y: 20}, {x: '2016-12-26', y: 10}]
      }]
    }
  }

console.log(data)
  return (
  <div>
    {data.map(el => el.humidity)}
  </div>
  )
}

export default TempHumidityChart;