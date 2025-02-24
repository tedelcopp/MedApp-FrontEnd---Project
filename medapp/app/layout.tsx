import Sidebar from "./components/sidebar/page";
import { Toaster } from "react-hot-toast";
import "../app/globals.css"
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
      <body className="bg-backgroundLight dark:bg-backgroundDark transition-all duration-300">
            <Toaster position="top-right" />
            <section className="flex">
              <Sidebar /> 
              <main className="flex-1 p-6">{children}</main>
            </section>
      </body>
      </head>
    </html>
  );
}
