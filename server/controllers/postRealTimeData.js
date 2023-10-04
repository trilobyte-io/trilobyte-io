import pool from "../../db/connect.js"

const postRealTimeData = (request, response) => {
  let data = request.body;
  const currentDate = new Date();

  const mysqlDateTime = currentDate.toISOString().slice(0, 19).replace('T', ' ');


  let query = `INSERT INTO realTimeData (time, temperature, humidity, lux)
               VALUES ('${mysqlDateTime}', ${data.SHT_T}, ${data.SHT_RH}, ${data.TSL_lux});`;
  console.log("REQUEST IS MAKING IT TO RealTime CONTROLLER FUNCTION");

  pool.query(query, (error, results) => {
    if (error) {
      console.log(results)
      console.log("ERROR IN POST CONTROLLER: ", error);
      response.status(500).json({ error: 'An error occurred while posting data.' });
    } else {
      response.status(200).end();
    }
  });
}

export default postRealTimeData;