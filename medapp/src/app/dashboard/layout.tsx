import Sidebar from "../components/Sidebar";
import "../../styles/globals.css";

export const metadata = {
  title: "Medapp ⚕️",
  description: "Siempre cerca tuyo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-backgroundLight dark:bg-backgroundDark transition-colors duration-300">
        <section className="flex">
          <Sidebar />
          <main className="flex-1 p-6">{children}</main>
        </section>
      </body>
    </html>
  );
}
