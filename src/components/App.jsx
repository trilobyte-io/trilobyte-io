import React, { useState, useEffect } from "react";
import axios from "axios";
import TempChart from "./TempChart.jsx";
import HumidityChart from "./HumidityChart.jsx";


const App = () => {
  const [tempHumidity, setTempHumidity] = useState([])

  // BELOW IS THE LOGIC FOR ADDING NEW DATA POINTS TO BOTH TEMP AND HUMIDITY CHARTS IN REAL TIMEs

  // let newData = {
  //   temperature: Math.floor(Math.random() * 100) + 1,
  //   humidity: Math.floor(Math.random() * 100) + 1,
  //   time: new Date("2015-03-25")
  // }

  // let addData = (data) => {
  //   setTimeout(() => {
  //     let updatedData = [data, ...tempHumidity]
  //     setTempHumidity(updatedData)
  //   }, 5000)
  // }

  // addData(newData)



  const getTempHumidity = () => {
    axios.get("http://localhost:3000/tempHumidity")
    .then((res) => {
      console.log("RESPONSE FROM AXIOS", res)
      setTempHumidity(res.data)
    })
    .catch((err) => console.log("Error retrieving temperate and humidity data", err))
  }



  useEffect(getTempHumidity, []);
console.log("SHOULD BE MY DATA", tempHumidity)
  return (
    <>
      <div className="bg-white-100">
        <TempChart data={tempHumidity} />
        <HumidityChart data={tempHumidity} />
      </div>
    </>
  );
};

export default App;
