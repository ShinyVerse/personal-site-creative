import type { Metadata } from "next";
import { Lato, Caveat } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["400", "700"],
});

const handwriting = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-handwriting",
});

export const metadata: Metadata = {
  title: "Laura Jackson Personal Site",
  description: "A place for exploration and showcasing bits and bobs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${handwriting.variable}  antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
