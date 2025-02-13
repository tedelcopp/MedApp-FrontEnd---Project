"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaCloudSun,
  FaWhatsapp,
  FaVideo,
} from "react-icons/fa";

type Weather = {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
  };
};

type DollarRate = {
  compra: number;
  venta: number;
  casa: string;
  nombre: string;
  moneda: string;
  fechaActualizacion: string;
};

const DashboardContent = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [dollarRates, setDollarRates] = useState<DollarRate | null>(null);
  const [dollarError, setDollarError] = useState<string | null>(null);

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString());
    setCurrentTime(
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );

    const fetchWeather = async () => {
      try {
        const res = await fetch("/api/weather?q=Buenos Aires");
        if (!res.ok) {
          throw new Error("Error fetching weather data");
        }
        const data = await res.json();
        setWeather(data);
      } catch (err: any) {
        setWeatherError(err.message);
      }
    };

    fetchWeather();

    const fetchDollarRates = async () => {
      try {
        const res = await fetch("https://dolarapi.com/v1/dolares/oficial");
        if (!res.ok) {
          throw new Error("Error fetching dollar data");
        }
        const data = await res.json();

        setDollarRates({
          compra: data.compra,
          venta: data.venta,
          casa: data.casa,
          nombre: data.nombre,
          moneda: data.moneda,
          fechaActualizacion: data.fechaActualizacion,
        });
      } catch (err: any) {
        setDollarError(err.message);
      }
    };

    fetchDollarRates();
  }, []);

  const appointments = [
    { name: "María López", time: "10:30 AM", phone: "123456789" },
    { name: "Carlos Gómez", time: "11:15 AM", phone: "987654321" },
    { name: "Ana Torres", time: "2:00 PM", phone: "1122334455" },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-900 w-full h-full text-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8 w-full max-w-4xl">
        <div className="flex items-center gap-6">
        <Image
  src="/images/profile/med-profile.webp"
  alt="Foto del Profesional"
  width={96} 
  height={96} 
  className="rounded-full"
/>
          <div>
            <h2 className="text-2xl font-semibold">Dr. Juan Pérez</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Especialista en Terapia Cognitiva
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Fecha: {currentDate}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Horario: {currentTime}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8 w-full max-w-4xl">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaCalendarAlt className="text-indigo-600" /> Próximos Turnos
        </h3>
        <ul className="space-y-4">
          {appointments.map((appointment, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm"
            >
              <div>
                <span className="block font-medium">{appointment.name}</span>
                <span className="block text-sm text-gray-500 dark:text-gray-400">
                  {appointment.time}
                </span>
              </div>
              <div className="flex gap-2">
                <a
                  href={`https://wa.me/${appointment.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
                  title={`Contactar a ${appointment.name} por WhatsApp`}
                >
                  <FaWhatsapp size={18} />
                </a>
                <a
                  href="https://meet.google.com/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
                  title={`Generar reunión con ${appointment.name}`}
                >
                  <FaVideo size={18} />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex-1">
          <h3 className="text-2xl font-semibold mb-6 flex items-center justify-center gap-3 text-gray-900 dark:text-white">
            <FaDollarSign className="text-green-600 text-2xl" /> Dólar Hoy
          </h3>
          {dollarError ? (
            <p className="text-red-500 font-medium">Error: {dollarError}</p>
          ) : dollarRates ? (
            <div className="space-y-4 text-gray-800 dark:text-white">
              <p className="text-lg">
                • <span className="font-semibold"><u>Compra:</u></span> ${dollarRates.compra}
              </p>
              <p className="text-lg">
                • <span className="font-semibold"><u>Venta:</u></span> ${dollarRates.venta}
              </p>
              <p className="text-l text-center font-semibold">
                <span><u>Actualización:</u></span>{" "}
                {new Date(dollarRates.fechaActualizacion).toLocaleString("es-AR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 font-medium">Cargando...</p>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex-1">
          <h3 className="text-2xl font-semibold mb-6 flex items-center justify-center gap-3 text-gray-900 dark:text-white">
            <FaCloudSun className="text-blue-600 text-2xl" /> Clima
          </h3>
          {weatherError ? (
            <p className="text-red-500 font-medium">Error: {weatherError}</p>
          ) : weather ? (
            <div className="space-y-4 text-gray-800 dark:text-white">
              <p className="text-lg">
                • <span className="font-semibold"><u>Ciudad:</u></span> {weather.location.name}
              </p>
              <p className="text-lg">
                • <span className="font-semibold"><u>Temperatura:</u></span> {weather.current.temp_c}°C
              </p>
            </div>
          ) : (
            <p className="text-gray-500 font-medium">Cargando...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
