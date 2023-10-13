import pool from "../../db/connect.js"

const postSensorData = (request, response) => {
  const data = request.body;
  console.log(data)
  const currentDate = new Date();
  const mysqlDateTime = currentDate.toISOString().slice(0, 19).replace('T', ' ');

  const query = `INSERT INTO tempHum (time, temperature, humidity, lux)
               VALUES ('${mysqlDateTime}', ${data.SHT_T}, ${data.SHT_RH}, ${data.TSL_lux});`;
  // eslint-disable-next-line no-unused-vars
  pool.query(query, (error, results) => {
    if (error) {
      console.error("ERROR IN POST CONTROLLER: ", error);
      return response.status(500).json({ error: 'An error occurred while posting data.' });
    }

    // Respond with success when the query is successful
    return response.status(200).json({ message: 'success' });
  });
}

export default postSensorData;