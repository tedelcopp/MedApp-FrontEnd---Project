import { NextResponse } from 'next/server';
import createConnection from '../../lib/mysql';
import { RowDataPacket } from 'mysql2/promise';

export async function GET() {
  try {
    const connection = await createConnection();
    const [rows] = await connection.execute<RowDataPacket[]>(
      `SELECT
         shifts.id, 
         shifts.date, 
         shifts.time, 
         shifts.phone, 
         patients.FirstName AS patientFirstName,
         patients.LastName AS patientLastName
       FROM shifts
       JOIN patients ON shifts.patientId = patients.id
       ORDER BY shifts.date ASC, shifts.time ASC`
    ); 
    
    const appointments = rows.map((row) => ({
      id: row.id,
      name: `${row.patientFirstName} ${row.patientLastName}`, 
      time: row.time,
      phone: row.phone,
      date: row.date.toISOString().split('T')[0],
    }));
    
    await connection.end();
    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error al obtener los turnos:", error);
    return NextResponse.json({ error: "No se pudieron cargar los turnos." }, { status: 500 });
  }
}