
import "./styles/globals.css";

export const metadata = {
  title: "Rugel Fitness",
  description: "Más que un entrenamiento",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-backgroundLight dark:bg-backgroundDark transition-colors duration-300">
        <main>{children}</main>
      
      </body>
    </html>
  );
}
