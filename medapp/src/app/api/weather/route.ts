// import { NextResponse } from 'next/server';

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const city = searchParams.get('q') || 'Buenos Aires';

//   const apiKey = process.env.WEATHER_API_KEY;
//   if (!apiKey) {
//     return NextResponse.json({ error: 'API Key no encontrada en las variables de entorno' }, { status: 500 });
//   }

//   const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city.trim())}&aqi=no`;

//   try {
//     const response = await fetch(apiUrl, { cache: 'no-store' }); 
//     const data = await response.json();

//     if (!response.ok || data.error) {
//       return NextResponse.json({ error: data.error?.message || 'Error al obtener datos' }, { status: response.status || 500 });
//     }

//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json({ error: 'Error al obtener datos del clima' }, { status: 500 });
//   }
// }
