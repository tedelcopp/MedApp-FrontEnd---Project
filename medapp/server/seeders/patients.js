import Patient from "../models/Patient.js";
import sequelize from "../config/sequelize.js";

const seedPatients = async () => {
  await sequelize.sync({ force: false }); // No borra la BD
  await Patient.bulkCreate([
    {
      name: "Juan",
      lastName: "Pérez",
      age: 32,
      phone: "1234567890",
      comments: "Revisión general",
    },
    {
      name: "María",
      lastName: "Gómez",
      age: 28,
      phone: "0987654321",
      comments: "Chequeo anual",
    },
  ]);
  console.log("✅ Pacientes insertados");
};

seedPatients();
