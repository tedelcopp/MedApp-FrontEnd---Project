"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogOut, Power } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function UserButton() {
  const { data: session } = useSession(); 

  return session ? (
    <button
      onClick={() => signOut({ callbackUrl: "/logout" })}
      className="flex items-center gap-4 px-6 py-3 font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-all duration-200 ease-in-out w-full justify-start rounded-md"
      title="Cerrar sesión en MedApp"
    >
      <LogOut size={20} className="text-gray-500 hover:text-red-600" />
      Cerrar sesión
    </button>
  ) : (
    <button
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="flex items-center gap-3 px-7 py-3 text-lg rounded-lg font-medium text-white bg-violet-600 hover:bg-violet-500 transition-all duration-200 ease-in-out"
      title="Acceder con Google en MedApp"
    >
      <FcGoogle size={28} />
      Acceder con Google
    </button>
  );
}
