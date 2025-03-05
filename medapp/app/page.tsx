"use client";
import Image from "next/image";
import UserButton from "../app/components/UserButton";
import { ShieldPlus, CheckCircle, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function HomePage() {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Complete todos los campos para ingresar.");
      return;
    }
  
    const res = await signIn("credentials", {
      email: username, 
      password: password,
      redirect: false, 
    });
  
    if (res?.error) {
      toast.error("Credencial incorrecta.");
    } else {
      toast.success("Credencial correcta.");
      window.location.href = "/dashboard"; 
    }
  };
  
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-200 overflow-hidden fixed top-0 left-0">
      <div className="flex max-w-5xl w-full h-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/2 h-full flex flex-col justify-center items-center bg-white p-8">
          <h1 className="text-5xl font-extrabold text-black mb-4 flex items-center gap-3 relative">
            <ShieldPlus className="w-10 h-10 text-violet-600" />
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
          {isLoginVisible ? (
            <div className="w-full mt-4 transition-all duration-300">
<input 
  type="text" 
  placeholder="Usuario" 
  className="w-full p-3 mb-3 border border-violet-500 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-500 transition"
  value={username} 
  onChange={(e) => setUsername(e.target.value)}
/>
<input 
  type="password" 
  placeholder="Contraseña" 
  className="w-full p-3 mb-4 border border-violet-500 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-500 transition"
  value={password} 
  onChange={(e) => setPassword(e.target.value)}
/>
              <button 
                onClick={handleLogin} 
                className="w-full px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition">
                Ingresar
              </button>
              <button 
                onClick={() => setIsLoginVisible(false)} 
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center mt-4">
                <X className="w-5 h-5" /> Cerrar
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsLoginVisible(true)} 
              className="w-full px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition flex items-center justify-center mt-4">
              ¿Ya tienes usuario? <span className="ml-2 font-semibold">Iniciar Sesión</span>
            </button>
          )}
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
