import React, { useState, useEffect } from "react";
import axios from "axios";
import HumidityChart from "./HumidityChart.jsx";
import DropdownMenu from "./DropdownMenu.jsx";
import RealTimeGaugeContainer from "./RealTimeGaugeContainer.jsx";
import filterDataByTimeRange from "../frontend-utils/filterDataByTimeRange.js";


const App = () => {
  const [allData, setAllData] = useState([])
  const [timeRange, setTimeRange] = useState("pastMonth");



  const getAllData = () => {
    axios.get("http://localhost:3000/allData")
    .then((res) => {
      console.log("RESPONSE FROM AXIOS", res)
      setAllData(res.data)
    })
    .catch((err) => console.log("Error retrieving temperate and humidity data", err))
  }

  const handleTimeRangeButtonClick = (timeRange) => {
    setTimeRange(timeRange); // Update the selected time range
  };


  useEffect(getAllData, []);

  return (
      <div className="bg-gray-800 min-h-screen flex justify-center">
        <div className="max-w-screen-xl w-full">
          <RealTimeGaugeContainer />
          <DropdownMenu handleTimeRangeButtonClick={handleTimeRangeButtonClick} />
          <HumidityChart
            data={filterDataByTimeRange(allData, timeRange)}
            timeRange={timeRange}
            dataType="Humidity" />
          </div>
      </div>
  );
};

export default App;