"use client";

import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import MobileNavbar from "./MobileNavBar";
import Navbar from "./Navbar";

const navItems = [
  { name: "Home", href: "/" },
  { name: "What I'm up to", href: "/artwork" },
  { name: "Career", href: "/career" },
  { name: "Connect", href: "/about", isButton: true },
];

export type NavItem = {
  name: string;
  href: string;
  isButton?: boolean;
};

export default function NavBarDecider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const navHeight = isOpen ? 200 : 50;

  return (
    <>
      {isMobile ? (
        <>
          <MobileNavbar
            navItems={navItems}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <main style={{ paddingTop: navHeight }}>{children}</main>
        </>
      ) : (
        <>
          <Navbar navItems={navItems} />
          <div className="flex-1 overflow-x-hidden bg-white">{children}</div>
        </>
      )}
    </>
  );
}
