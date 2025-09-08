"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation"; 
import { FaCalendarAlt, FaDollarSign, FaCloudSun, FaWhatsapp, FaVideo } from "react-icons/fa";
import { useSession } from "next-auth/react";

// Tipos de datos para el clima, el dólar y los turnos
type Weather = {
  location: { name: string };
  current: { temp_c: number };
};

type DollarRate = {
  compra: number;
  venta: number;
};

type Appointment = {
  id: number;
  name: string;
  time: string;
  phone: string;
  date: string;
};

const DashboardContent = () => {
  const router = useRouter(); 
  const { data: session, status } = useSession();
  const userName = session?.user?.name ?? "Usuario Desconocido"; 

  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [dollarRates, setDollarRates] = useState<DollarRate | null>(null);
  const [dollarError, setDollarError] = useState<string | null>(null);
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [appointmentsError, setAppointmentsError] = useState<string | null>(null);

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
      } catch (err) {
        console.error("Error clima:", err);
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
      } catch (err) {
        console.error("Error dólar:", err);
        setDollarError("No se pudo cargar la cotización del dólar");
      }
    };

    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/shifts");
        if (!res.ok) {
          throw new Error("Error al obtener los turnos.");
        }
        const data: Appointment[] = await res.json();
        setAppointments(data);
        setAppointmentsError(null);
      } catch (err) {
        console.error("Error al obtener turnos:", err);
        setAppointmentsError("No se pudieron cargar los turnos.");
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchWeather();
    fetchDollarRates();
    fetchAppointments();

    const interval = setInterval(() => {
      fetchWeather();
      fetchDollarRates();
      fetchAppointments();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const appointmentList = useMemo(
    () => {
      if (loadingAppointments) {
        return <p className="text-center text-gray-500">Cargando turnos...</p>;
      }
      if (appointmentsError) {
        return <p className="text-center text-red-500">{appointmentsError}</p>;
      }
      if (appointments.length === 0) {
        return <p className="text-center text-gray-500">No hay turnos próximos.</p>;
      }

      return appointments.map((appointment) => (
        <li key={appointment.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <div>
            <span className="block font-medium">{appointment.name}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(appointment.date).toLocaleDateString("es-AR")} - {appointment.time}
            </span>
          </div>
          <div className="flex gap-3">
            <a href={`https://wa.me/${appointment.phone}`} target="_blank" rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-md">
              <FaWhatsapp size={20} />
            </a>
            <a href="https://meet.google.com/new" target="_blank" rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md">
              <FaVideo size={20} />
            </a>
          </div>
        </li>
      ));
    }, [appointments, loadingAppointments, appointmentsError]
  );

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-300 text-lg font-semibold">Validando credenciales...</p>
      </div>
    );
  }

  if (status !== "authenticated") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-600 text-lg font-semibold">Acceso denegado. Por favor, inicia sesión para ver el contenido.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-900 w-full h-full text-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-3xl text-center md:text-left flex flex-col md:flex-row items-center">
        <div className="w-24 h-24 rounded-full shadow-md overflow-hidden bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
          {session?.user?.image ? (
            <img src={session.user.image} alt="Foto de perfil" className="w-full h-full object-cover" />
          ) : (
            <span className="text-xl font-semibold text-gray-500 dark:text-gray-400">◉</span>
          )}
        </div>
        <div className="ml-6">
          <h2 className="text-2xl font-semibold">Especialista {userName}</h2>
          <p className="text-gray-500 dark:text-gray-400">Especialista en Terapia Cognitiva</p>
          <p className="text-gray-500 dark:text-gray-400">Fecha: {currentDate}</p>
          <p className="text-gray-500 dark:text-gray-400">Horario: {currentTime}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-6 w-full max-w-3xl">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaCalendarAlt className="text-indigo-600" /> Próximos Turnos
        </h3>
        <ul className="space-y-4">{appointmentList}</ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mt-6">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col items-center justify-center min-h-[150px] text-center">
          <h3 className="text-2xl font-semibold flex items-center">
            <FaDollarSign className="text-green-600 mr-2" /> Dólar Hoy
          </h3>
          {dollarError ? <p className="text-red-500 font-medium">Error: {dollarError}</p> : dollarRates ? (
            <div className="text-lg">
              <p><span className="font-semibold">Compra:</span> ${dollarRates.compra}</p>
              <p><span className="font-semibold">Venta:</span> ${dollarRates.venta}</p>
            </div>
          ) : <p className="text-gray-500">Cargando...</p>}
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col items-center justify-center min-h-[150px] text-center">
          <h3 className="text-2xl font-semibold flex items-center">
            <FaCloudSun className="text-blue-600 mr-2" /> Clima
          </h3>
          {weatherError ? <p className="text-red-500 font-medium">Error: {weatherError}</p> : weather ? (
            <p className="text-lg"><span className="font-semibold">Temperatura:</span> {weather.current.temp_c}°C</p>
          ) : <p className="text-gray-500">Cargando...</p>}
        </div> 
      </div>
    </div>
  );
};

export default DashboardContent;