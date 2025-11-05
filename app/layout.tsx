import type { Metadata } from "next";
import { Inter } from "next/font/google";

// --- ¡LA LÍNEA MÁS IMPORTANTE! ---
import "./globals.css";
// ---------------------------------

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Organigrama Institucional",
  description: "Organigrama del Colegio Los Cerritos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* 'children' aquí será tu 'page.tsx' */}
        {children}
      </body>
    </html>
  );
}