import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // Importa la configuración correctamente

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
