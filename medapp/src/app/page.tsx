import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin"); // 🔹 Redirige a Auth0 si no está autenticado
  } else {
    redirect("/home"); // 🔹 Si está autenticado, lo envía al Dashboard
  }

  return null; // 🔹 No renderiza nada, solo maneja la redirección
}
