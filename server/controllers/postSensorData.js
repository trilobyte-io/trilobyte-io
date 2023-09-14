import pool from "../../db/connect.js"

// const getTempHumidity = (request, response) => {
//   let query = `SELECT * FROM TempHum;`
//   console.log("REQUEST: ", request)
//   console.log("RESPONSE: ", response)
//   pool.query(query)
//   .then((res) => {response.send(res)})
//   .catch(err => console.log("ERROR IN CONTROLLER: ", err))
// }

const postSensorData = (request, response) => {
  let data = request.body;
  const currentDate = new Date();

  const mysqlDateTime = currentDate.toISOString().slice(0, 19).replace('T', ' ');


  let query = `INSERT INTO tempHum (time, temperature, humidity, lux)
               VALUES (${mysqlDateTime}, ${data.SHT_T}, ${data.SHT_RH}, ${data.TSL_lux});`;
  console.log("REQUEST IS MAKING IT TO TEMPHUM CONTROLLER FUNCTION");

  pool.query(query, (error, results) => {
    if (error) {
      console.log("ERROR IN POST CONTROLLER: ", error);
      response.status(500).json({ error: 'An error occurred while posting data.' });
    } else {
      response.status(200).end();
    }
  });
}

export default postSensorData;