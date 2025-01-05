// src/db/index.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

// Conexión a la base de datos MySQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  logging: false,
});

async function authenticate() {
  console.log("Intentando conectar a la base de datos...");
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida.");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error.message);
    console.error(error.stack);
  }
}

module.exports = { sequelize, authenticate };
