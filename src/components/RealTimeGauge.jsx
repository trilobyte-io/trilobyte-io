import React from 'react';
import GaugeChart from 'react-gauge-chart';


const RealTimeGauge = () => {

  return <GaugeChart id="gauge-chart6"
  animate={false}
  nrOfLevels={15}
  percent={0.56}
  needleColor="#345243"
/>
};

export default RealTimeGauge;