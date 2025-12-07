import type { Metadata } from "next";
import { Lato, Orbitron, Poppins } from "next/font/google";

import AuthHandler from "./components/AuthHandler";
import NavBarDecider from "./components/NavBarDecider";
import { AuthProvider } from "./contexts/AuthContext";
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

const handwriting = Poppins({
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
      className={`${lato.variable} ${handwriting.variable} ${block.variable} antialiased`}
    >
      <body>
        <AuthProvider>
          <AuthHandler />
          <div className="flex h-screen flex-col md:flex-row">
            <NavBarDecider>{children}</NavBarDecider>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
