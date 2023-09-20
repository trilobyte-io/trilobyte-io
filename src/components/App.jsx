import React, { useState, useEffect } from "react";
import axios from "axios";
import TempChart from "./TempChart.jsx";
import HumidityChart from "./HumidityChart.jsx";
import LuxChart from "./LuxChart.jsx";


const App = () => {
  const [allData, setAllData] = useState([])
  const [timeRange, setTimeRange] = useState("pastDay");



  const getAllData = () => {
    axios.get("http://localhost:3000/allData")
    .then((res) => {
      console.log("RESPONSE FROM AXIOS", res)
      setAllData(res.data)
    })
    .catch((err) => console.log("Error retrieving temperate and humidity data", err))
  }

  const filterDataByTimeRange = (data, selectedTimeRange) => {
    // Get the current date and time
    const currentDate = new Date();

    // Calculate the date based on the selected time range
    let startDate;

    if (selectedTimeRange === 'pastHour') {
      startDate = new Date(currentDate);
      startDate.setHours(currentDate.getHours() - 1);
    } else if (selectedTimeRange === 'pastDay') {
      startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - 1);
    } else if (selectedTimeRange === 'pastWeek') {
      startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - 7);
    } else if (selectedTimeRange === 'pastMonth') {
      startDate = new Date(currentDate);
      startDate.setMonth(currentDate.getMonth() - 1);
    } else if (selectedTimeRange === 'pastYear') {
      startDate = new Date(currentDate);
      startDate.setFullYear(currentDate.getFullYear() - 1);
    }

    // Filter the data based on the calculated start date
    const filteredData = data.filter((item) => {
      const timestampDate = new Date(item.time);
      return timestampDate >= startDate;
    });
    console.log("filtered data", filteredData)
    return filteredData;
  };

  const handleTimeRangeButtonClick = (timeRange) => {
    setTimeRange(timeRange); // Update the selected time range
  };


  useEffect(getAllData, []);

  return (
    <>
      <div className="bg-white-100">
        <button onClick={() => handleTimeRangeButtonClick('pastHour')}>Past Hour</button>
        <button onClick={() => handleTimeRangeButtonClick('pastDay')}>Past Day</button>
        <button onClick={() => handleTimeRangeButtonClick('pastWeek')}>Past Week</button>
        <button onClick={() => handleTimeRangeButtonClick('pastMonth')}>Past Month</button>
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