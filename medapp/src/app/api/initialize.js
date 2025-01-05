// filepath: /c:/Users/Tomás/Desktop/MedApp - Project/medapp/src/app/api/initialize.js
const mysql = require("mysql2/promise");

async function initialize() {
  const connection = await mysql.createConnection({
    host: "localhost", // Replace with your database host
    user: "your-username", // Replace with your database username
    password: "your-password", // Replace with your database password
    database: "your-database-name", // Replace with your database name
  });

  try {
    await connection.connect();
    console.log("Base de datos verificada y conexión establecida.");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
}

initialize();
