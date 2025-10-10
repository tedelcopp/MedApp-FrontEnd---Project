"use client";
import { useTheme } from "../../context/theme-context";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  House, User, Calendar, Settings, ShieldPlus, BotMessageSquare, StepForward, StepBack, LogOut, Menu, // Ícono de Menú Hamburguesa
} from "lucide-react";
import UserButton from "../UserButton";

const navigation = [
  { name: "Inicio", href: "/dashboard", icon: House },
  { name: "Pacientes", href: "/patients", icon: User },
  { name: "Turnos", href: "/shifts", icon: Calendar },
  { name: "Configuración", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const { darkMode, toggleTheme } = useTheme(); 
  // ESTO ES LO QUE CAMBIÓ: El sidebar ahora inicia en false (cerrado)
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  const navigationLinks = useMemo(
    () => navigation.map((item) => (
      <Link key={item.name} href={item.href} onClick={() => setSidebarOpen(false)}
        className="flex items-center px-4 py-2 text-sm font-medium hover:bg-indigo-500 rounded-lg">
        <item.icon size={20} className="mr-3 text-gray-100" /> 
        {item.name}
      </Link>
    )),
    []
  );

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      
      {/* Botón para Abrir el Sidebar en Móvil (Circular Violeta) */}
      {!sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-30 lg:hidden rounded-md" 
          title="Abrir Menú"
        >
          {/* Contenedor Circular Violeta */}
          <span className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 shadow-lg hover:bg-indigo-500 transition-colors">
            {/* Ícono de Menú Hamburguesa Blanco */}
            <Menu className="h-6 w-6 text-white" /> 
          </span>
        </button>
      )}

      {/* Sidebar principal */}
      <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-56 bg-indigo-600 dark:bg-indigo-800 text-gray-100 z-20`}> 

        <div className="flex items-center justify-between h-16 bg-indigo-700 px-4">
        <Link href="/" className="flex items-center justify-center text-center w-full">
          <ShieldPlus size={36} className="mr-3" /> 
          <span className="text-2xl font-bold text-white">MedApp</span> 
        </Link>
          {/* Botón para Cerrar/Alternar */}
          <button type="button" onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white lg:hidden">
            {sidebarOpen ? <StepBack className="h-6 w-6" /> : <StepForward className="h-6 w-6" />}
          </button>
        </div>

        <nav className="mt-4 space-y-2">{navigationLinks}</nav>

        <div className="mt-auto flex flex-col items-center p-4 space-y-4">

          <button
            onClick={() => {
              const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
              const whatsappURL = isMobile ? "whatsapp://" : "https://web.whatsapp.com/";
              window.open(whatsappURL, "_blank");
            }}
            className="flex items-center justify-center px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-500"
            title="Abrir WhatsApp"
            aria-label="Abrir aplicación de WhatsApp"
          >
            <BotMessageSquare size={20} className="mr-2" />
            WhatsApp
          </button>

          <button
            onClick={toggleTheme} 
            className="px-4 py-2 bg-indigo-500 rounded-lg text-white hover:bg-indigo-400"
            title="Cambiar tema"
            aria-label="Cambiar el tema de la App"
          >
            {darkMode ? "☀️ Modo Claro" : "🌙Modo Oscuro"} 
          </button>
          
          <div className="mt-auto flex flex-col items-center p-4 space-y-4">
            <UserButton /> 
          </div>
        </div>
      </div>
    </div>
  );
}