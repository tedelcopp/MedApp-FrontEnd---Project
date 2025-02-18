import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin"); // 🔹 Redirige a la página de login en lugar de usar `/api/auth/signin`
  } else {
    redirect("/home"); // 🔹 Envía a home si el usuario ya está autenticado
  }

  return null; 
}
