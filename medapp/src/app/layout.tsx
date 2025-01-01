import Sidebar from "./sidebar/page";
import { Toaster } from 'react-hot-toast';  
import "../styles/globals.css";

export const metadata = {
  title: "Medapp ⚕️",
  description: "Siempre cerca tuyo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-backgroundLight dark:bg-backgroundDark transition-colors duration-300">
      <Toaster   position="top-right"/>  
        <section className="flex">
          <Sidebar />
          <main className="flex-1 p-6">{children}</main>
        </section>
      </body>
    </html>
  );
}
