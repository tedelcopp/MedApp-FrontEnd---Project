"use client";
import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { FaCalendarAlt, FaDollarSign, FaCloudSun, FaWhatsapp, FaVideo } from "react-icons/fa";

type Weather = {
  location: { name: string };
  current: { temp_c: number };
};

type DollarRate = {
  compra: number;
  venta: number;
};

const DashboardContent = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [dollarRates, setDollarRates] = useState<DollarRate | null>(null);
  const [dollarError, setDollarError] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setCurrentDate(date.toLocaleDateString("es-AR"));
      setCurrentTime(date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch("/api/weather?q=Buenos Aires");
        if (!res.ok) throw new Error("Error al obtener el clima");
        const data = await res.json();
        setWeather(data);
        setWeatherError(null);
      } catch {
        setWeatherError("No se pudo cargar el clima");
      }
    };

    const fetchDollarRates = async () => {
      try {
        const res = await fetch("https://dolarapi.com/v1/dolares/oficial");
        if (!res.ok) throw new Error("Error al obtener dólar");
        const data = await res.json();
        setDollarRates(data);
        setDollarError(null);
      } catch {
        setDollarError("No se pudo cargar la cotización del dólar");
      }
    };

    fetchWeather();
    fetchDollarRates();

    const interval = setInterval(() => {
      fetchWeather();
      fetchDollarRates();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const appointments = [
    { name: "María López", time: "10:30 AM", phone: "123456789" },
    { name: "Carlos Gómez", time: "11:15 AM", phone: "987654321" },
    { name: "Ana Torres", time: "2:00 PM", phone: "1122334455" },
  ];

  const appointmentList = useMemo(
    () =>
      appointments.map((appointment, index) => (
        <li key={index} className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm">
          <div className="text-center sm:text-left">
            <span className="block font-medium">{appointment.name}</span>
            <span className="block text-sm text-gray-500 dark:text-gray-400">{appointment.time}</span>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <a href={`https://wa.me/${appointment.phone}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full">
              <FaWhatsapp size={18} />
            </a>
            <a href="https://meet.google.com/new" target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full">
              <FaVideo size={18} />
            </a>
          </div>
        </li>
      )),
    [appointments]
  );

  return (
    <div className="flex flex-col items-center p-4 md:p-6 bg-gray-100 dark:bg-gray-900 w-full h-full text-gray-900 dark:text-gray-100">
      
      {/* Tarjeta de Perfil */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-3xl text-center md:text-left flex flex-col md:flex-row items-center">
        <Image src="/images/profile/med-profile.webp" alt="Foto del Profesional" width={96} height={96} className="rounded-full mb-4 md:mb-0 md:mr-6" />
        <div>
          <h2 className="text-2xl font-semibold">Dr. Juan Pérez</h2>
          <p className="text-gray-500 dark:text-gray-400">Especialista en Terapia Cognitiva</p>
          <p className="text-gray-500 dark:text-gray-400">Fecha: {currentDate}</p>
          <p className="text-gray-500 dark:text-gray-400">Horario: {currentTime}</p>
        </div>
      </div>

      {/* Lista de Turnos */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-6 w-full max-w-3xl">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaCalendarAlt className="text-indigo-600" /> Próximos Turnos
        </h3>
        <ul className="space-y-4">{appointmentList}</ul>
      </div>

      {/* Información de Dólar y Clima */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mt-6">
        
        {/* Dólar */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col items-center justify-center min-h-[150px] text-center">
          <h3 className="text-2xl font-semibold flex items-center justify-center">
            <FaDollarSign className="text-green-600 text-2xl mr-2" /> Dólar Hoy
          </h3>
          {dollarError ? (
            <p className="text-red-500 font-medium">Error: {dollarError}</p>
          ) : dollarRates ? (
            <div className="text-lg space-y-2">
              <p><span className="font-semibold">Compra:</span> ${dollarRates.compra}</p>
              <p><span className="font-semibold">Venta:</span> ${dollarRates.venta}</p>
            </div>
          ) : (
            <p className="text-gray-500 font-medium">Cargando...</p>
          )}
        </div>

        {/* Clima */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col items-center justify-center min-h-[150px] text-center">
          <h3 className="text-2xl font-semibold flex items-center justify-center">
            <FaCloudSun className="text-blue-600 text-2xl mr-2" /> Clima
          </h3>
          {weatherError ? (
            <p className="text-red-500 font-medium">Error: {weatherError}</p>
          ) : weather ? (
            <div className="text-lg space-y-2">
              <p><span className="font-semibold">Ciudad:</span> {weather.location.name}</p>
              <p><span className="font-semibold">Temp:</span> {weather.current.temp_c}°C</p>
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
