import pool from "../../db/connect.js"

const getAllData = (request, response) => {
  let query = `SELECT * FROM tempHum;`;
  console.log("REQUEST IS MAKING IT TO TEMPHUM CONTROLLER FUNCTION")

  pool.query(query, (error, results) => {
    if (error) {
      console.log("ERROR IN CONTROLLER: ", error);
      response.status(500).json({ error: 'An error occurred while fetching data.' });
    } else {
      response.status(200).json(results);
    }
  });
}

export default getAllData;