import pool from "./connect.js";
import fs from "fs";

const createTables = fs.readFileSync("./db/db.sql").toString();
const populate = fs.readFileSync('./db/etl.sql').toString();

pool.getConnection((err, connection) => {
  if (err) {
    return console.error("Error acquiring connection", err.stack);
  }

  console.log("creating tables");

  const statements = createTables
    .split(";")
    .filter((statement) => statement.trim() !== "");

  for (let i = 0; i < statements.length; i++) {
    connection.query(statements[i], (err, result) => {
      if (err) {
        console.error(err);
        return result;
      }
    });

    if (i === statements.length - 1) {
      connection.query(populate, function(err, result){
        if(err){
            console.log('error: ', err);
            process.exit(1);
        }
        console.log('populate database complete')
        console.log(result)
        process.exit(0);
      });
    }
  }
});
