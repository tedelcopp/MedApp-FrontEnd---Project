"use client";
import Image from "next/image";
import UserButton from "../app/components/UserButton";
import { ShieldPlus, CheckCircle, X } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Toaster } from "react-hot-toast"; 
import { useRouter } from "next/navigation"; 

export default function HomePage() {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { toast } = await import('react-hot-toast');

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
      router.push("/dashboard"); 
    }
  };

  return (
    <>
      <Toaster position="bottom-center" /> 
      <div className="flex items-center justify-center w-screen h-screen bg-gray-200 overflow-auto fixed top-0 left-0">
        <div className="flex max-w-5xl w-full h-auto min-h-full md:h-full bg-white shadow-lg rounded-lg overflow-hidden my-4 md:my-0">
          
          <div className="w-full md:w-1/2 h-auto flex flex-col justify-center items-center bg-white p-6 sm:p-8">
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
        <ul className="text-gray-700 text-center mb-6 w-full max-w-md mx-auto">
  <li className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-base sm:text-lg mb-3">
    <div className="flex items-center">
      <CheckCircle className="w-5 h-5 text-violet-600 mr-2" />
      <span className="font-semibold text-center">Seguridad garantizada</span>
    </div> 
    <span className="text-center sm:text-left">en cada consulta.</span>
  </li>
  <li className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-base sm:text-lg mb-3">
    <div className="flex items-center">
      <CheckCircle className="w-5 h-5 text-violet-600 mr-2" />
      <span className="font-semibold text-center">Protección de datos</span>
    </div>
    <span className="text-center sm:text-left">de pacientes.</span>
  </li>
  <li className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-base sm:text-lg">
    <div className="flex items-center">
      <CheckCircle className="w-5 h-5 text-violet-600 mr-2" />
      <span className="font-semibold text-center">Facilidad y rapidez</span>
    </div>
    <span className="text-center sm:text-left">en la gestión de turnos.</span>
  </li>
</ul>
            <UserButton />
            
            {isLoginVisible ? (
              <div className="w-full mt-4 transition-all duration-300 max-w-sm"> {/* Añadido max-w-sm */}
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
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center mt-4">
                <span className="text-gray-700 mb-2">¿Ya tienes usuario?</span> 
                
                <button
                  onClick={() => setIsLoginVisible(true)}
                  className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
                >
                  <span className="font-semibold">Iniciar Sesión</span>
                </button>
              </div>
            )}
          </div>
          
          <div className="hidden md:block w-1/2 h-full relative">
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
    </>
  );
}