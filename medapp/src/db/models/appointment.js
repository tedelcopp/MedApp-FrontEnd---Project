// src/db/models/Appointment.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../index");
const Patient = require("./patient"); // Relación con el modelo Patient

const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pendiente",
    },
  },
  {
    timestamps: true,
  }
);

// Relación con el paciente
Appointment.belongsTo(Patient, {
  foreignKey: "patientId",
  onDelete: "CASCADE",
});

module.exports = Appointment;
