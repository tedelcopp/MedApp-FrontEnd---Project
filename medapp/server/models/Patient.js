import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Patient = sequelize.define("Patient", {
  name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER },
  diagnosis: { type: DataTypes.STRING },
});

export default Patient;
