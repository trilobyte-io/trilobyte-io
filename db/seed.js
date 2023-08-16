import pool from "./connect.js";
import fs from "fs";

const createTables = fs.readFileSync("./db/db.sql", "utf-8").toString();

// pool.getConnection((err, client, release) => {
//   if (err) {
//     return console.error("Error acquiring client", err.stack);
//   }
//   console.log("creating tables");
//   pool.query(createTables, function (err, result) {
//     if (err) {
//       console.log("error: ", err);
//       process.exit(1);
//     }
//     console.log("created tables in database");
//   });
//   console.log(`connected to '${client.database}' on port ${client.port}`);
// });

pool.getConnection((err, connection) => {
  if (err) {
    return console.error("Error acquiring connection", err.stack);
  }

  console.log("creating tables");
  const statements = createTables
    .split(";")
    .filter((statement) => statement.trim() !== "");

  connection.query(statements[0], (err, result) => {
    if (err) {
      console.error("First query error:", err);
      return result;
    }

    connection.query(statements[1], (err, result) => {
      if (err) {
        console.error("Second query error:", err);
        return;
      }

      connection.query(statements[2], (err, result) => {
        if (err) {
          console.error("Third query error:", err);
          return;
        }

        console.log("Created tables in database");

        // Release the connection back to the pool
        connection.release();

        console.log(
          `Connected to '${connection.config.database}' on port ${connection.config.port}`
        );
        return result;
      });
      return result;
    });
  });
});
