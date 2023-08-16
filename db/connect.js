import mysql from "mysql2";
import { config } from "dotenv";

config(); // Load environment variables from .env

const connection = mysql.createConnection({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});

connection.connect(function (err) {
  if (err) {
    console.log(err, "UH OH");
  }
  console.log("Connected!");
  /*Create a table named "customers":*/
  var sql =
    "CREATE TABLE IF NOT EXISTS customers (name VARCHAR(255), address VARCHAR(255))";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
    return result;
  });
});
