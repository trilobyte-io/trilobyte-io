import React, { useState, useEffect } from "react";
import axios from "axios";
import TempChart from "./TempChart.jsx";
import HumidityChart from "./HumidityChart.jsx";
import LuxChart from "./LuxChart.jsx";


const App = () => {
  const [tempHumidity, setTempHumidity] = useState([])



  const getAllData = () => {
    axios.get("http://localhost:3000/allData")
    .then((res) => {
      console.log("RESPONSE FROM AXIOS", res)
      setTempHumidity(res.data)
    })
    .catch((err) => console.log("Error retrieving temperate and humidity data", err))
  }



  useEffect(getAllData, []);

  return (
    <>
      <div className="bg-white-100">
        <TempChart data={tempHumidity} />
        <HumidityChart data={tempHumidity} />
        <LuxChart data={tempHumidity} />
      </div>
    </>
  );
};

export default App;
