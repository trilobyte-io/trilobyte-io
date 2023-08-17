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
});
