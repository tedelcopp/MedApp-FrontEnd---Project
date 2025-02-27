"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import UserButton from "../app/components/UserButton";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading" || session) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <p className="text-gray-600 mt-4">Cargando..</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-screen w-screen">
      <div className="w-1/2 h-full flex flex-col justify-center items-center bg-white">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Bienvenido a MedApp</h1>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          La plataforma más confiable para gestionar pacientes y turnos de manera rápida y segura.
        </p>

        {/* ✅ Botón de inicio de sesión */}
        <UserButton />

        <p className="text-sm text-gray-600 mt-4">
          ¿No tienes una cuenta? <a href="#" className="text-blue-500 hover:underline">Regístrate</a>
        </p>
      </div>

      {/* 📌 Sección de la imagen - 50% de la pantalla */}
      <div className="w-1/2 h-full relative">
        <Image
          src="/images/imagen1.jpg"
          alt="Imagen de bienvenida"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </div>
  );
}
