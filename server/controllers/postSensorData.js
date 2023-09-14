import pool from "../../db/connect.js"

const postSensorData = (request, response) => {
  let query = `INSERT INTO tempHum (time, temperature, humidity)
               VALUES ('2023-09-14 08:30:25', 15, 15);`;
  console.log("REQUEST IS MAKING IT TO TEMPHUM POST CONTROLLER FUNCTION")

  pool.query(query, (error, results) => {
    if (error) {
      console.log("ERROR IN CONTROLLER: ", error);
      response.status(500).json({ error: 'An error occurred while posting data.' });
    } else {
      response.status(200).json(results);
    }
  });
}

export default postSensorData;