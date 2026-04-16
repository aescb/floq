import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Floq — Ganadería inteligente para Latinoamérica",
  description:
    "Cercado virtual y monitoreo de bienestar animal con IA. La próxima generación del manejo ganadero en Chile y Latinoamérica.",
  openGraph: {
    title: "Floq — Ganadería inteligente para Latinoamérica",
    description:
      "Cercado virtual y monitoreo de bienestar animal con IA. La próxima generación del manejo ganadero en Chile y Latinoamérica.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
