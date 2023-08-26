import pool from "../../db/connect.js"

// const getTempHumidity = (request, response) => {
//   let query = `SELECT * FROM TempHum;`
//   console.log("REQUEST: ", request)
//   console.log("RESPONSE: ", response)
//   pool.query(query)
//   .then((res) => {response.send(res)})
//   .catch(err => console.log("ERROR IN CONTROLLER: ", err))
// }

const getTempHumidity = (request, response) => {
  let query = `SELECT * FROM TempHum;`;

  pool.query(query, (error, results) => {
    if (error) {
      console.log("ERROR IN CONTROLLER: ", error);
      response.status(500).json({ error: 'An error occurred while fetching data.' });
    } else {
      response.status(200).json(results);
    }
  });
}

export default getTempHumidity;