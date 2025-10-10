"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
// Importamos FaCircleNotch para usarlo como spinner
import { FaCalendarAlt, FaDollarSign, FaCloudSun, FaWhatsapp, FaVideo, FaCircleNotch } from "react-icons/fa";
import { useSession } from "next-auth/react";

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
  patient: string;
  time: string;
  phone: string; // Sabemos que es un string (puede ser vacío, o "null")
  date: string;
};

// Función para limpiar el número de teléfono (solo deja dígitos)
const formatWhatsAppNumber = (phoneNumber: string) => {
  if (!phoneNumber) return "";
  
  // Limpieza simple y directa: solo números.
  return phoneNumber.replace(/\D/g, "");
};

// Componente para los botones de acción, para simplificar la lógica del mapeo
const ActionButtons = ({ appointment }: { appointment: Appointment }) => {
    // 1. Construir el mensaje solicitado.
    const message = `Hola ${appointment.patient}, te escribimos desde MedApp para informarte sobre tu turno.`;
    
    // 2. Codificar el mensaje
    const encodedMessage = encodeURIComponent(message);
    
    // 3. Obtener el número limpio (solo dígitos) para la URL.
    const cleanedPhone = formatWhatsAppNumber(appointment.phone);
    
    // 4. Construir el enlace completo (ej: https://wa.me/54911...?text=Hola...)
    const whatsappLink = `https://wa.me/${cleanedPhone}?text=${encodedMessage}`;

    return (
        <div className="flex gap-3">
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-md"
                title={`Enviar WhatsApp a ${appointment.patient}`}
            >
                <FaWhatsapp size={20} />
            </a>
            <a
                href="https://meet.google.com/new"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md"
            >
                <FaVideo size={20} />
            </a>
        </div>
    );
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

  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  
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
        const res = await fetch(`${API_BASE_URL}/api/shifts`);
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
  }, [API_BASE_URL]);

  const appointmentList = useMemo(() => {
    if (loadingAppointments) {
      return <p className="text-center text-gray-500">Cargando turnos...</p>;
    }
    if (appointmentsError) {
      return <p className="text-center text-red-500">{appointmentsError}</p>;
    }
    if (appointments.length === 0) {
      return <p className="text-center text-gray-500">No hay turnos registrados.</p>;
    }

    const now = new Date();

    const pastAppointments = appointments.filter((appointment) => {
      // Combina fecha y hora para una comparación precisa
      const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
      return appointmentDate < now;
    });

    const futureAppointments = appointments.filter((appointment) => {
      const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
      return appointmentDate >= now;
    });

    // Esta función renderiza la lista. El parámetro showButtons controla si se incluyen los botones de acción.
    const renderAppointments = (list: Appointment[], showButtons: boolean) =>
      list.map((appointment) => {
        
        return (
          <li
            key={appointment.id}
            className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <div>
              <span className="block font-medium">{appointment.patient}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {/* Asegura el formato de fecha local y la hora */}
                {new Date(appointment.date).toLocaleDateString("es-AR")} - {appointment.time} hs
              </span>
            </div>
            
            {/* Solo muestra los botones si showButtons es true (para Turnos Pendientes) */}
            {showButtons && <ActionButtons appointment={appointment} />}
          </li>
        );
      });

    return (
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold mb-2 text-green-600">Turnos Pendientes</h4>
          {futureAppointments.length > 0 ? (
            // Llamada para futuros turnos: showButtons = true
            <ul className="space-y-4">{renderAppointments(futureAppointments, true)}</ul>
          ) : (
            <p className="text-gray-500">No hay turnos futuros.</p>
          )}
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2 text-red-600">Turnos Realizados</h4>
          {pastAppointments.length > 0 ? (
            // Llamada para turnos pasados: showButtons = false
            <ul className="space-y-4">{renderAppointments(pastAppointments, false)}</ul>
          ) : (
            <p className="text-gray-500">No hay turnos pasados.</p>
          )}
        </div>
      </div>
    );
  }, [appointments, loadingAppointments, appointmentsError]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        {/* Ícono de carga con animación 'animate-spin' */}
        <FaCircleNotch 
          className="animate-spin text-indigo-600 dark:text-indigo-400 mb-4" 
          size={36} 
        />
        <p className="text-gray-500 dark:text-gray-300 text-lg font-semibold">
          Validando tu credencial
        </p>
      </div>
    );
  }

  if (status !== "authenticated") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-600 text-lg font-semibold">
          Acceso denegado. Por favor, inicia sesión para ver el contenido.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-900 w-full h-full text-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-3xl text-center md:text-left flex flex-col md:flex-row items-center">
        <div className="w-24 h-24 rounded-full shadow-md overflow-hidden bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt="Foto de perfil"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xl font-semibold text-gray-500 dark:text-gray-400">◉</span>
          )}
        </div>
        <div className="ml-6">
          <h2 className="text-2xl font-bold">Consultorio de {userName}</h2>
          <p className="text-gray-500 dark:text-gray-400 font-semibold">Especialista en Terapia Cognitiva</p>
          <p className="text-gray-500 dark:text-gray-400 font-semibold">• <u>Fecha:</u> {currentDate}</p>
          <p className="text-gray-500 dark:text-gray-400 font-semibold">• <u>Horario:</u> {currentTime} hs</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-6 w-full max-w-3xl">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaCalendarAlt className="text-indigo-600" /> Agenda
        </h3>
        {appointmentList}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mt-6">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col items-center justify-center min-h-[150px] text-center">
          <h3 className="text-2xl font-semibold flex items-center">
            <FaDollarSign className="text-green-600 mr-2" /> Dólar Hoy
          </h3>
          {dollarError ? (
            <p className="text-red-500 font-medium">Error: {dollarError}</p>
          ) : dollarRates ? (
            <div className="text-lg">
              <p>
                <span className="font-semibold">• <u>Compra:</u></span> ${dollarRates.compra}
              </p>
              <p>
                <span className="font-semibold">• <u>Venta:</u></span> ${dollarRates.venta}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">Cargando...</p>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col items-center justify-center min-h-[150px] text-center">
          <h3 className="text-2xl font-semibold flex items-center">
            <FaCloudSun className="text-blue-600 mr-2" /> Clima
          </h3>
          {weatherError ? (
            <p className="text-red-500 font-medium">Error: {weatherError}</p>
          ) : weather ? (
            <p className="text-lg">
              <span className="font-semibold">• <u>Temperatura:</u></span>{" "}
              {weather.current.temp_c}°C
            </p>
          ) : (
            <p className="text-gray-500">Cargando...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;