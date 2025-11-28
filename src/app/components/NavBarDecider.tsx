"use client";

import { useIsMobile } from "../hooks/useIsMobile";
import MobileNavbar from "./MobileNavBar";
import Navbar from "./Navbar";
import { useState } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Artwork", href: "/artwork" },
  { name: "About", href: "/about" },
  { name: "Career", href: "/career" },
  { name: "Experimental", href: "/experimental" },
];

export type NavItem = {
  name: string;
  href: string;
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
          <Navbar navItems={navItems} isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="flex-1 overflow-x-hidden">{children}</div>
        </>
      )}
    </>
  );
}
