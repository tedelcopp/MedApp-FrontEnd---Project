"use client";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogIn, Loader2, ShieldPlus, CheckCircle } from "lucide-react"; 

export default function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/home"); 
    }
  }, [status, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-800 text-white p-6">
      <div className="bg-white text-gray-900 shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center">
          <div className="bg-blue-600 p-4 rounded-full shadow-lg">
            <ShieldPlus  size={50} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold mt-4 text-center">Te damos la bienvenida a MedApp</h1>
          <div className="mt-4 space-y-3 text-gray-600 text-center">
  <div className="flex items-start gap-3 justify-center">
    <CheckCircle className="text-indigo-600 shrink-0 mt-1" size={24} />
    <span className="text-lg leading-snug text-center w-full flex flex-col">
      Gestiona tus turnos de manera eficiente y segura.
    </span>
  </div>
  <div className="flex items-start gap-3 justify-center">
    <CheckCircle className="text-indigo-600 shrink-0 mt-1" size={24} />
    <span className="text-lg leading-snug text-center w-full flex flex-col">
      Accede a la información de tus pacientes en un solo lugar.
    </span>
  </div>
  <div className="flex items-start gap-3 justify-center">
    <CheckCircle className="text-indigo-600 shrink-0 mt-1" size={24} />
    <span className="text-lg leading-snug text-center w-full flex flex-col">
    Ahorra tiempo y evita errores con una gestión optimizada
    </span>
  </div>
</div>
</div>
        {status === "loading" || status === "authenticated" ? (
          <div className="flex items-center justify-center gap-2 mt-6 text-blue-600">
            <Loader2 className="animate-spin" size={24} />
            <span className="text-lg font-medium">Cargando...</span>
          </div>
        ) : (
          <button
            className="w-full flex items-center justify-center gap-2 mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-medium shadow-md"
            onClick={() => signIn("auth0", { callbackUrl: "/home" })}
          >
            <LogIn size={20} />
            Iniciar sesión
          </button>
        )}
<div className="mt-6 text-center text-gray-600">
  <p className="text-sm flex items-start justify-center gap-2">
    <span>Tu privacidad es nuestra prioridad. Seguridad garantizada en cada acceso.</span>
  </p>
</div>
        <div className="mt-6 text-center text-gray-400 text-xs">
          <p>&copy; {new Date().getFullYear()} MedApp. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}
