"use client";
import { useIsMobile } from "../hooks/useIsMobile";
import MobileNavbar from "./MobileNavBar";
import Navbar from "./Navbar";
import { useState } from "react";

export default function NavBarDecider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const navHeight = isOpen ? 200 : 50;

  console.log(isMobile, isOpen);

  return (
    <>
      {isMobile ? (
        <>
          <MobileNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
          <main style={{ paddingTop: navHeight }}>{children}</main>
        </>
      ) : (
        <>
          <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="flex-1 overflow-x-hidden">{children}</div>
        </>
      )}
    </>
  );
}
