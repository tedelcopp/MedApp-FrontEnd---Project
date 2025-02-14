"use client";
import { ThemeProvider } from "../context/theme-context";
import Sidebar from "./sidebar/page";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-backgroundLight dark:bg-backgroundDark transition-all duration-300">
          <ThemeProvider>
            <Toaster position="top-right" />
            <section className="flex">
              <Sidebar />
              <main className="flex-1 p-6">{children}</main>
            </section>
          </ThemeProvider>
      </body>
    </html>
  );
}
