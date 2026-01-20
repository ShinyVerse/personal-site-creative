import type { Metadata } from "next";
import {  Orbitron, Poppins, Lexend_Deca } from "next/font/google";

import NavBarDecider from "./components/NavBarDecider";
import "./globals.css";


const normal = Lexend_Deca({
  subsets: ["latin"],
  variable: "--font-normal",
  weight: ["400", "700"],
});

const block = Orbitron({
  subsets: ["latin"],
  variable: "--font-block",
  weight: [ "400", "500", "600", "700", ],
});

const handwriting = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-handwriting",
});

export const metadata: Metadata = {
  title: "Laura Jackson Personal Site",
  description: "A place for exploration and showcasing bits and bobs",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${handwriting.variable} ${block.variable} ${normal.variable} antialiased`}
    >
      <body>
        <div className="flex h-screen flex-col">
          <NavBarDecider>{children}</NavBarDecider>
        </div>
      </body>
    </html>
  );
}
