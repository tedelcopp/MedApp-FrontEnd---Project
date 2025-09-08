// app/lib/mysql.ts
import mysql from "mysql2/promise"; 
import dotenv from "dotenv";

dotenv.config();

const createConnection = () => {
  return mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "123456",
    database: process.env.DB_NAME || "medapp",
    port: parseInt(process.env.DB_PORT || "3306"),
  });
};

export default createConnection;