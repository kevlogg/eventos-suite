import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eventos Suite - Plataforma Todo en Uno para Fiestas",
  description: "Invitaciones digitales, trivia interactiva y fotos en vivo por QR para eventos inolvidables.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}

