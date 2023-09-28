import React, { useState, useEffect } from "react";
import axios from "axios";
import TempChart from "./TempChart.jsx";
import HumidityChart from "./HumidityChart.jsx";
import LuxChart from "./LuxChart.jsx";
import DropdownMenu from "./DropdownMenu.jsx";
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
    <>
      <div className="bg-white-100">
        <DropdownMenu handleTimeRangeButtonClick={handleTimeRangeButtonClick} />
        <TempChart
          data={filterDataByTimeRange(allData, timeRange)}
          timeRange={timeRange}
          dataType="Temperature" />
        <HumidityChart
          data={filterDataByTimeRange(allData, timeRange)}
          timeRange={timeRange}
          dataType="Humidity" />
        <LuxChart
          data={filterDataByTimeRange(allData, timeRange)}
          timeRange={timeRange}
          dataType="Lux" />
      </div>
    </>
  );
};

export default App;