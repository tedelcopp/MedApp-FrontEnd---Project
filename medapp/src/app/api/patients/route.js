// src/app/api/patients/route.js
import Patient from "../../../db/models/patient";

// Crear un paciente
export async function POST(req) {
  const { name, dni, birthDate, notes } = await req.json();

  try {
    const patient = await Patient.create({
      name,
      dni,
      birthDate,
      notes,
    });
    return new Response(JSON.stringify(patient), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}

// Obtener todos los pacientes
export async function GET() {
  try {
    const patients = await Patient.findAll();
    return new Response(JSON.stringify(patients), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// Obtener un paciente por ID
export async function GET({ params }) {
  const { id } = params;
  try {
    const patient = await Patient.findByPk(id);
    if (!patient) {
      return new Response(JSON.stringify({ error: "Paciente no encontrado" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(patient), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
