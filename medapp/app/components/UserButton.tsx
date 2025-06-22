"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Power } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function UserButton() {
  const { data: session } = useSession(); 

  return session ? (
    <button
      onClick={() => signOut({ callbackUrl: "/logout" })}
      className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white bg-red-600 hover:bg-red-500 transition-all duration-200 ease-in-out"
      title="Cerrar sesión en MedApp"
    >
      <Power size={24} />
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
