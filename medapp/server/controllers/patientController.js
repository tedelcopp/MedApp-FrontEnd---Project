import Patient from "../models/Patient.js";

// Obtener todos los pacientes
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los pacientes" });
  }
};

// Crear un paciente
export const createPatient = async (req, res) => {
  try {
    const newPatient = await Patient.create(req.body);
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el paciente" });
  }
};
