import pool from "./connect.js";
import fs from "fs";

const createTables = fs.readFileSync("./db/db.sql").toString();

pool.getConnection((err, connection) => {
  if (err) {
    return console.error("Error acquiring connection", err.stack);
  }

  console.log("creating tables");

  const statements = createTables
    .split(";")
    .filter((statement) => statement.trim() !== "");
  console.log("LENGTH", statements.length);

  for (let i = 0; i < statements.length; i++) {
    connection.query(statements[i], (err, result) => {
      if (err) {
        console.error(err);
        return result;
      }
    });
  }

  // connection.query(statements[0], (err, result) => {
  //   if (err) {
  //     console.error("First query error:", err);
  //     return result;
  //   }

  //   connection.query(statements[1], (err, result) => {
  //     if (err) {
  //       console.error("Second query error:", err);
  //       return;
  //     }

  //     connection.query(statements[2], (err, result) => {
  //       if (err) {
  //         console.error("Third query error:", err);
  //         return;
  //       }

  //       console.log("Created tables in database");

  //       // Release the connection back to the pool
  //       connection.release();

  //       console.log(
  //         `Connected to '${connection.config.database}' on port ${connection.config.port}`
  //       );
  //       return result;
  //     });
  //     return result;
  //   });
  // });
});
