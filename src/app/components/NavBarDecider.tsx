"use client";

import { useMemo, useState } from "react";
import { tv } from "tailwind-variants";
import { useIsMobile } from "../hooks/useIsMobile";
import MobileNavbar from "./MobileNavBar";
import Navbar from "./Navbar";

const navItems = [
  { name: "Home", href: "/" },
  { name: "What I'm up to", href: "/current" },
  { name: "Career", href: "/career" },
  // { name: "Connect", href: "/about", isButton: true },
];

export type NavItem = {
  name: string;
  href: string;
  isButton?: boolean;
};

const navBarDeciderStyles = tv({
  slots: {
    mainOpen: "pt-[200px]",
    mainClosed: "pt-[50px]",
    desktopContainer: "flex-1 overflow-x-hidden bg-white",
  },
});

export default function NavBarDecider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const styles = useMemo(() => navBarDeciderStyles(), []);

  return (
    <>
      {isMobile ? (
        <>
          <MobileNavbar
            navItems={navItems}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <main className={isOpen ? styles.mainOpen() : styles.mainClosed()}>{children}</main>
        </>
      ) : (
        <>
          <Navbar navItems={navItems} />
          <div className={styles.desktopContainer()}>{children}</div>
        </>
      )}
    </>
  );
}
