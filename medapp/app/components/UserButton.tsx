"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { LogOut, LogIn } from "lucide-react";

export default function UserButton() {
  const { data: session } = useSession(); 

  return (
    <button
      onClick={() => (session ? signOut({ callbackUrl: "/logout" }) : signIn("google", { callbackUrl: "/" }))}
      className={`flex items-center justify-center px-4 py-2 rounded-lg text-white ${
        session ? "bg-red-600 hover:bg-red-500" : "bg-blue-600 hover:bg-blue-500"
      }`}
      title={session ? "Cerrar sesión en MedApp" : "Iniciar sesión en MedApp"}
    >
      {session ? (
        <>
          <LogOut size={20} className="mr-2" />
          Cerrar sesión
        </>
      ) : (
        <>
          <LogIn size={20} className="mr-2" />
          Iniciar sesión
        </>
      )}
    </button>
  );
}
