"use client";

import { SessionProvider, useSession } from "next-auth/react";
import Sidebar from "./components/sidebar/page";
import { ThemeProvider } from "../app/context/theme-context";
import { Toaster } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <title>MedApp</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-backgroundLight dark:bg-backgroundDark transition-all duration-300">
        <SessionProvider>
          <ThemeProvider>
            <Toaster position="top-right" />
            <ProtectedLayout>{children}</ProtectedLayout>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

// 🔐 Protección de rutas y redirección tras iniciar sesión
function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log("Estado de la sesión:", status);
    console.log("Ruta actual:", pathname);
  
    if (status === "unauthenticated" && pathname !== "/") {
      router.push("/");
    } else if (session && pathname === "/") {
      console.log("Redirigiendo a /dashboard");
      router.push("/dashboard");
    }
  }, [status, pathname, session, router]);

  return (
    <section className="flex">
      {session && <Sidebar />}
      <main className="flex-1 p-6">{children || <p className="text-gray-500">No hay contenido disponible</p>}</main>
    </section>
  );
}