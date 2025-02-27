"use client";
import { SessionProvider } from "next-auth/react";
import Sidebar from "./components/sidebar/page";
import { ThemeProvider } from "../app/context/theme-context";
import { Toaster } from "react-hot-toast";
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
            <section className="flex">
              <Sidebar />
              <main className="flex-1 p-6">{children}</main>
            </section>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
