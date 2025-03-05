"use client";

import { useRouter } from "next/navigation";
import { ShieldPlus, ArrowLeft } from "lucide-react";

export default function LogOut() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100 fixed top-0 left-0 overflow-hidden">
      <div className="p-12 md:p-16 rounded-2xl shadow-2xl w-full max-w-4xl text-center bg-white text-gray-800">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-indigo-600 flex flex-col items-center">
          <span className="block">¡Gracias por visitar</span>
          <span className="block flex items-center gap-2">MedApp! <ShieldPlus size={50} className="text-indigo-500 hover:text-indigo-700 transition-colors duration-300" /></span>
        </h1>
        <p className="text-lg md:text-2xl leading-relaxed">
          Nos alegra que hayas utilizado nuestra plataforma. En <span className="font-semibold">Medapp</span>, nos enfocamos en
          brindarte una experiencia eficiente y organizada para gestionar turnos y pacientes.
        </p>

        <p className="mt-8 text-xl md:text-2xl italic text-gray-500">
          "Tu salud y tiempo son nuestra prioridad."
        </p>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 flex items-center justify-center gap-2 text-lg font-semibold rounded-xl shadow-md bg-indigo-600 text-white hover:bg-indigo-800 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-400"
          >
            <ArrowLeft size={24} className="text-white hover:text-gray-200 transition-colors duration-300" /> Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}
