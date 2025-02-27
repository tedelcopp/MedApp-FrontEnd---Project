"use client";

import { useTheme } from "../context/theme-context";

export default function LoginPage() {
  const { darkMode } = useTheme();

  return (
    <div className={`flex items-center justify-center h-screen transition-all duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <div className={`p-16 rounded-xl shadow-xl w-[80%] max-w-5xl text-center transition-all duration-300 
        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>

        <h1 className={`text-6xl font-extrabold mb-8 ${darkMode ? "text-indigo-300" : "text-indigo-600"}`}>
          ¡Gracias por visitar <span className={darkMode ? "text-indigo-400" : "text-indigo-600"}>MedApp</span>! 🎉
        </h1>

        <p className="text-2xl leading-relaxed">
          Nos alegra que hayas pasado por aquí. Nuestra plataforma está diseñada para
          facilitar la gestión de tus turnos y pacientes, brindando una experiencia eficiente y organizada.
        </p>

        <p className="mt-10 text-3xl italic text-gray-500 transition-all duration-300">
          {darkMode ? `"Cuidamos tu bienestar, incluso en la oscuridad."` : `"La salud es lo primero, y estamos aquí para ayudarte."`}
        </p>
      </div>
    </div>
  );
}
