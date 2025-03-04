"use client";

import { useRouter } from "next/navigation";

export default function LogOut() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100 fixed top-0 left-0 overflow-hidden">
      <div className="p-12 md:p-16 rounded-2xl shadow-2xl w-full max-w-4xl text-center bg-white text-gray-800">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-indigo-600">
          ¡Gracias por visitar <span className="text-indigo-600">MedApp</span>! ⚕️
        </h1>
        <p className="text-lg md:text-2xl leading-relaxed">
          Nos alegra que hayas utilizado nuestra plataforma. En MedApp, nos enfocamos en
          brindarte una experiencia eficiente y organizada para gestionar turnos y pacientes.
        </p>

        <p className="mt-8 text-xl md:text-3xl italic text-gray-500">
          "Tu salud y tiempo son nuestra prioridad."
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-10 px-6 py-3 text-lg font-semibold rounded-xl shadow-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          🔙 Volver al Inicio
        </button>
      </div>
    </div>
  );
}
