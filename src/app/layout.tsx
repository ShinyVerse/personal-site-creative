import type { Metadata } from "next";
import { Lato, Caveat, Orbitron, Sarpanch } from "next/font/google";

import "./globals.css";
import NavBarDecider from "./components/NavBarDecider";

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

const loud = Sarpanch({
  subsets: ["latin"],
  variable: "--font-loud",
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
      lang="en"
      className={`${lato.variable} ${handwriting.variable} ${block.variable} ${loud.variable} antialiased`}
    >
      <body>
        <div className="flex h-screen flex-col md:flex-row">
          <NavBarDecider>{children}</NavBarDecider>
        </div>
      </body>
    </html>
  );
}
