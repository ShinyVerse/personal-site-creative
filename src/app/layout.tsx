import type { Metadata } from "next";
import { Lato, Caveat, Orbitron } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["400", "700"],
});
const block = Orbitron({
  subsets: ["latin"],
  variable: "--font-block",
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
    <html
      className={`${lato.variable} ${handwriting.variable} ${block.variable} antialiased`}
      lang="en"
    >
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
