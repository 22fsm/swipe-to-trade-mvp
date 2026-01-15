import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SwapSpot - Trade What You Have",
  description: "A marketplace for trading items",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} font-sans antialiased bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen text-gray-900`}>
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">{children}</main>
      </body>
    </html>
  );
}
