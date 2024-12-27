"use client"

import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaDollarSign, FaCloudSun } from "react-icons/fa";

const DashboardContent = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString());
    setCurrentTime(date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-900 w-full h-full text-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8 w-full max-w-4xl">
        <div className="flex items-center gap-6">
          <img
            src="https://via.placeholder.com/150"
            alt="Foto del Profesional"
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-semibold">Dr. Juan Pérez</h2>
            <p className="text-gray-500 dark:text-gray-400">Especialista en Terapia Cognitiva</p>
            <p className="text-gray-500 dark:text-gray-400">Fecha: {currentDate}</p>
            <p className="text-gray-500 dark:text-gray-400">Hora: {currentTime}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8 w-full max-w-4xl">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaCalendarAlt className="text-indigo-600" /> Próximos Turnos
        </h3>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>Paciente: María López</span>
            <span>10:30 AM</span>
          </li>
          <li className="flex justify-between">
            <span>Paciente: Carlos Gómez</span>
            <span>11:15 AM</span>
          </li>
          <li className="flex justify-between">
            <span>Paciente: Ana Torres</span>
            <span>2:00 PM</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex-1">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaDollarSign className="text-green-600" /> Dólar Hoy
          </h3>
          <p>Compra: $460.00</p>
          <p>Venta: $465.00</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex-1">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaCloudSun className="text-blue-600" /> Clima
          </h3>
          <p>Ciudad: Buenos Aires</p>
          <p>Temperatura: 23°C</p>
          <p>Estado: Soleado</p>
        </div>
      </div>    
    </div>
  );
};

export default DashboardContent;
