import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://dolarapi.com/v1/dolares/oficial");
    if (!res.ok) throw new Error("Error al obtener dólar");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Dólar API error:", error);
    return NextResponse.json({ error: "No se pudo cargar la cotización" }, { status: 500 });
  }
}
