import express from "express";
import {
  getPatients,
  createPatient,
} from "../controllers/patientController.js";

const router = express.Router();

router.get("/", getPatients);
router.post("/", createPatient); // ⬅️ Ruta para guardar pacientes

export default router;
