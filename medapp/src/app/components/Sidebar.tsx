'use client';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { House, User, Calendar, PieChart, ClipboardList, Settings, Sun, Moon } from 'lucide-react';
import { FaUser, FaWhatsapp } from 'react-icons/fa';

const navigation = [
  { name: 'Inicio', href: '/dashboard', icon: House },
  { name: 'Pacientes', href: '/dashboard/patients', icon: User },
  { name: 'Turnos', href: '/dashboard/appointments', icon: Calendar },
  { name: 'Reportes', href: '/dashboard/reports', icon: PieChart },
  { name: 'Historial Clínico', href: '/dashboard/clinical-history', icon: ClipboardList },
  { name: 'Configuración', href: '/dashboard/settings', icon: Settings },
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
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-56 bg-indigo-600 dark:bg-indigo-800 text-gray-100`}
      >
        <div className="flex items-center justify-between h-16 bg-indigo-700 px-4">
          <a href="#" className="flex items-center">
            <img
              alt="Psychology App Logo"
              src="https://via.placeholder.com/100"
              className="h-8 w-auto object-contain"
            />
            <span className="ml-2 text-lg font-bold text-white">PsychologyApp</span>
          </a>
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white lg:hidden"
          >
            {sidebarOpen ? (
              <ChevronLeftIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
        <nav className="mt-4 space-y-2">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} legacyBehavior>
              <a className="flex items-center px-4 py-2 text-sm font-medium hover:bg-indigo-500 rounded-lg">
                <item.icon size={20} className="mr-3 text-gray-100" />
                {item.name}
              </a>
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col items-center justify-center h-16 bg-indigo-700">
          <div className="flex items-center">
            <FaUser className="text-white mr-2" />
            <div>
              <p className="text-sm font-medium text-white">Dr. Tomás</p>
              <a
                href="#profile"
                className="text-xs font-light text-gray-300 hover:underline"
              >
                Ver perfil
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center p-4 space-y-4">
          <button
            onClick={() => window.open('https://wa.me/1234567890', '_blank')}
            className="flex items-center justify-center px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-500"
          >
            <FaWhatsapp size={20} className="mr-2" />
         WhatsApp
          </button>
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center px-4 py-2 bg-indigo-700 rounded-lg text-white hover:bg-indigo-600"
          >
            {darkMode ? (
              <Sun size={20} className="mr-2 text-yellow-400" />
            ) : (
              <Moon size={20} className="mr-2 text-gray-300" />
            )}
            Cambiar Tema
          </button>

        </div>
      </div>

      <div className="flex-1 p-4">
      </div>
    </div>
  );
}