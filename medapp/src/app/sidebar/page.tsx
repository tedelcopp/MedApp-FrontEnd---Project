'use client';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import {
  House, User, Calendar, Settings,
  Sun, Moon, ShieldPlus, BotMessageSquare, CircleUserRound,
  StepForward, StepBack
} from 'lucide-react';

const navigation = [
  { name: 'Inicio', href: '/', icon: House },
  { name: 'Pacientes', href: '/patients', icon: User },
  { name: 'Turnos', href: '/shifts', icon: Calendar },
  { name: 'Configuración', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('darkMode', newTheme.toString());
    document.documentElement.classList.toggle('dark', newTheme);

    toast(`Tema ${newTheme ? 'Oscuro' : 'Claro'} activado`, {
      icon: newTheme ? '🌙' : '🌞',
      style: {
        borderRadius: '10px',
        background: newTheme ? '#333' : '#fff',
        color: newTheme ? '#fff' : '#333',
      },
    });
  };

  const navigationLinks = useMemo(() => (
    navigation.map((item) => (
      <Link key={item.name} href={item.href} prefetch={true} onClick={() => setSidebarOpen(false)}
        className="flex items-center px-4 py-2 text-sm font-medium hover:bg-indigo-500 rounded-lg">
        <item.icon size={20} className="mr-3 text-gray-100" />
        {item.name}
      </Link>
    ))
  ), []);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-56 bg-indigo-600 dark:bg-indigo-800 text-gray-100`}>
        
        <div className="flex items-center justify-between h-16 bg-indigo-700 px-4">
          <Link href="/" className="flex items-center space-x-2">
            <ShieldPlus />
            <span className="text-lg font-bold text-white">MedApp</span>
          </Link>
          <button type="button" onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white lg:hidden">
            {sidebarOpen ? <StepBack className="h-6 w-6" aria-hidden="true" /> : <StepForward className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>

        <nav className="mt-4 space-y-2">
          {navigationLinks}
        </nav>

        <div className="mt-auto flex flex-col items-center justify-center h-16 bg-indigo-700">
          <div className="flex items-center space-x-2">
            <CircleUserRound className="text-white" />
            <div className="text-center">
              <p className="text-sm font-medium text-white">Dr. Juan Pérez</p>
              <Link href="/settings" className="text-xs font-light text-gray-300 hover:underline">
                Ver perfil
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center p-4 space-y-4">
          <button
            onClick={() => {
              const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
              const whatsappURL = isMobile ? 'whatsapp://' : 'https://web.whatsapp.com/';
              window.open(whatsappURL, '_blank');
            }}
            className="flex items-center justify-center px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-500"
            title="Abrir WhatsApp"
            aria-label="Abrir aplicación de WhatsApp">
            <BotMessageSquare size={20} className="mr-2" />
            WhatsApp
          </button>

          <button
            onClick={toggleTheme}
            className="flex items-center justify-center px-4 py-2 bg-indigo-700 rounded-lg text-white hover:bg-indigo-600"
            title={`Activar Modo ${darkMode ? 'Claro' : 'Oscuro'}`}
            aria-label={`Activar Modo ${darkMode ? 'Oscuro' : 'Claro'}`}>
            {darkMode ? (
              <>
                <Moon size={20} className="mr-2 text-gray-300" />
                Modo Oscuro
              </>
            ) : (
              <>
                <Sun size={20} className="mr-2 text-yellow-400" />
                Modo Claro
              </>
            )}
          </button>
        </div>
      </div>
      <div className="flex-1 p-4"></div>
    </div>
  );
}
