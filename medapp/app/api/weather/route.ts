import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("q") || "Buenos Aires";
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Falta la API key del clima" }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("WeatherAPI error:", errorText);
      return NextResponse.json({ error: "Error al obtener el clima" }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Fallo interno" }, { status: 500 });
  }
}
