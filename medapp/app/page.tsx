"use client";
import Image from "next/image";
import UserButton from "../app/components/UserButton";
import { ShieldCheck, CheckCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-screen bg-gray-200">
      <div className="flex max-w-5xl max-h-[90vh] w-full h-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/2 h-full flex flex-col justify-center items-center bg-white p-8">
          <h1 className="text-5xl font-extrabold text-black mb-4 flex items-center gap-2 relative">
            <span className="relative inline-block pb-2">
              MedApp
              <span className="absolute left-0 bottom-[-10px] w-full h-2 bg-violet-600 rounded-full"></span>
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-6 text-center max-w-md">
            La plataforma más confiable para gestionar pacientes y turnos de manera <span className="font-semibold">rápida</span> y <span className="font-semibold">segura</span>.
          </p>
          <ul className="text-gray-700 text-left mb-6 text-base">
            <li className="flex items-center gap-2 text-lg"><CheckCircle className="text-violet-600" /> <span className="font-semibold">Seguridad garantizada</span> en cada consulta.</li>
            <li className="flex items-center gap-2 text-lg"><CheckCircle className="text-violet-600" /> <span className="font-semibold">Protección de datos</span> de pacientes.</li>
            <li className="flex items-center gap-2 text-lg"><CheckCircle className="text-violet-600" /> <span className="font-semibold">Facilidad y rapidez</span> en la gestión de turnos.</li>
          </ul>
          <UserButton />
          <p className="text-sm text-gray-600 mt-4">
            ¿No tienes una cuenta? <a href="#" className="text-violet-500 font-semibold hover:underline">Regístrate</a>
          </p>
        </div>

        <div className="w-1/2 h-full relative">
          <Image
            src="/images/imagen1.webp"
            alt="Imagen de bienvenida"
            layout="fill"
            objectFit="cover"
            priority={true} 
            placeholder="blur" 
            blurDataURL="data:image/webp;base64,UklGRhYAAABXRUJQVlA4WAoAAAABAAAA..."
          />
        </div>
      </div>
    </div>
  );
}
