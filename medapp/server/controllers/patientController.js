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
    console.log("📌 Datos recibidos en el backend:", req.body); // ✅ Verifica qué datos llegan

    // Extraer datos del cuerpo de la solicitud
    const { name, lastName, age, phone, comments } = req.body;

    // Verificar que los datos requeridos existen
    if (!name || !lastName || !age || !phone) {
      console.error("❌ Faltan datos en la solicitud:", req.body);
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    // Crear el paciente en la base de datos
    const newPatient = await Patient.create({
      name,
      lastName,
      age,
      phone,
      comments,
    });

    res.status(201).json(newPatient);
  } catch (error) {
    console.error("❌ Error en createPatient:", error);
    res.status(500).json({ error: "Error al crear el paciente" });
  }
};
