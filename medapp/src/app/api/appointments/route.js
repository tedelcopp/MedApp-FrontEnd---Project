// src/app/api/appointments/route.js
import Appointment from "../../../db/models/appointment";

// Crear un turno
export async function POST(req) {
  const { date, time, patientId } = await req.json();

  try {
    const appointment = await Appointment.create({
      date,
      time,
      patientId,
    });
    return new Response(JSON.stringify(appointment), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}

// Obtener todos los turnos
export async function GET() {
  try {
    const appointments = await Appointment.findAll();
    return new Response(JSON.stringify(appointments), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
