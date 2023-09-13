import mysql from "mysql2";
import { config } from "dotenv";

config(); // Load environment variables from .env

const pool = mysql.createPool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});

export default pool;
