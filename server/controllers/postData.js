import pool from "../../db/connect.js"

const postData = (request, response) => {
  let query = `INSERT INTO tempHum
                VALUES (17,2023-09-13 08:36:21,10,15);`;

  pool.query(query, (error, results) => {
    if (error) {
      console.log("ERROR IN CONTROLLER: ", error);
      response.status(500).json({ error: 'An error occurred while posting data.' });
    } else {
      response.status(200).json(results);
    }
  });
}

export default postData;