import pool from "../../db/connect.js"

const getTempHumidity = (request, response) => {
  let query = `SELECT * FROM TempHum`
  console.log("REQUEST: ", request)
  console.log("RESPONSE: ", response)
  pool.query(query)
  .then(res => console.log(res))
}

export default getTempHumidity;