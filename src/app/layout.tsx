import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PARATA - Peralatan Rumah Tangga Kita",
  description: "Temukan peralatan rumah tangga terlengkap di PARATA. Mulai dari perlengkapan dapur, dekorasi ruang tamu, hingga elektronik berkualitas dengan harga terbaik. Belanja sekarang!",
  keywords: ['peralatan rumah tangga', 'alat dapur', 'perabot rumah', 'belanja online', 'elektronik rumah', 'PARATA'],
  openGraph: {
    title: 'PARATA - Peralatan Rumah Tangga Kita',
    description: 'Lengkapi kenyamanan hunian Anda bersama PARATA. Pusat belanja kebutuhan rumah, alat dapur modern, dan perabot estetik.',
    url: 'https://www.parata.my.id',
    siteName: 'PARATA',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}