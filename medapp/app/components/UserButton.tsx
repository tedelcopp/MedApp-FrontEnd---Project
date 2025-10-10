"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Power } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function UserButton() {
  const { data: session } = useSession();

  return session ? (
    <button
      onClick={() => signOut({ callbackUrl: "/logout" })}
      className="
        flex items-center justify-center gap-2
        w-full
        px-4 py-2
        -mt-4
        rounded-lg
        font-medium text-white
        bg-gradient-to-r from-red-600 to-red-500
        hover:from-red-500 hover:to-red-400
        shadow-sm hover:shadow-md
        transition-all duration-200 ease-in-out
        active:scale-[0.97]
      "
      title="Cerrar sesión en MedApp"
    >
      <Power size={18} />
      <span>Cerrar sesión</span>
    </button>
  ) : (
    <button
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="
        flex items-center justify-center gap-3
        px-6 py-3
        rounded-lg
        text-lg font-medium text-white
        bg-gradient-to-r from-violet-600 to-violet-500
        hover:from-violet-500 hover:to-violet-400
        shadow-md hover:shadow-lg
        transition-all duration-200 ease-in-out
        active:scale-[0.97]
      "
      title="Acceder con Google en MedApp"
    >
      <FcGoogle size={26} />
      <span>Acceder con Google</span>
    </button>
  );
}
