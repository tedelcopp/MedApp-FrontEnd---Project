import express from "express";
import Patient from "../models/Patient.js";

const router = express.Router();

// Obtener todos los pacientes
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo pacientes" });
  }
});

// Agregar un paciente
router.post("/", async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ error: "Error creando paciente" });
  }
});

// Eliminar un paciente
router.delete("/:id", async (req, res) => {
  try {
    await Patient.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Error eliminando paciente" });
  }
});

export default router;
