"use client";

import { useTheme } from "../context/theme-context";
import { useRouter } from "next/navigation";

export default function LogOut() {
  const { darkMode } = useTheme();
  const router = useRouter();

  return (
    <div
      className={`flex items-center justify-center h-screen px-6 transition-all duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`p-12 md:p-16 rounded-2xl shadow-2xl w-full max-w-4xl text-center transition-all duration-300 
        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
      >
        <h1
          className={`text-5xl md:text-6xl font-extrabold mb-6 ${
            darkMode ? "text-indigo-300" : "text-indigo-600"
          }`}
        >
          ¡Gracias por visitar{" "}
          <span className={darkMode ? "text-indigo-400" : "text-indigo-600"}>MedApp</span>! ⚕️
        </h1>
        <p className="text-lg md:text-2xl leading-relaxed">
          Nos alegra que hayas utilizado nuestra plataforma. En MedApp, nos enfocamos en
          brindarte una experiencia eficiente y organizada para gestionar turnos y pacientes.
        </p>

        <p className="mt-8 text-xl md:text-3xl italic text-gray-500 transition-all duration-300">
          {darkMode
            ? `"Cuidamos tu bienestar, incluso en la oscuridad."`
            : `"Tu salud y tiempo son nuestra prioridad."`}
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-10 px-6 py-3 text-lg font-semibold rounded-xl shadow-md transition-all duration-300 
          bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          🔙 Volver al Inicio
        </button>
      </div>
    </div>
  );
}
