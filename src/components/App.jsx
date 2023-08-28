import React, { useState, useEffect } from "react";
import axios from "axios";
import TempHumidityChart from "./TempHumidityChart";

const App = () => {
  const [tempHumidity, setTempHumidity] = useState([])

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
      <div>Should Render!!</div>
      <TempHumidityChart data={tempHumidity} />
    </>
  );
};

export default App;
