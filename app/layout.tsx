import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Organigrama Institucional",
  description: "Modelo 1 – Navegable con niveles jerárquicos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
