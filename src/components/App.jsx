import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [tempHumidity, tempTempHumidity] = useState(null)

  const getTempHumidity = () => {
    axios.get("http://localhost:3000/tempHumidity")
    .then((res) => {
      console.log("RESPONSE FROM AXIOS", res)
    })
    .catch((err) => console.log("Error retrieving temperate and humidity data", err))

  }

  useEffect(getTempHumidity, []);

  return (
    <>
      <div>Should Render!!</div>
    </>
  );
};

export default App;
