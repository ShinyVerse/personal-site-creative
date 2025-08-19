"use client";

import Link from "next/link";
import { tv } from "tailwind-variants";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { NavItem } from "./NavBarDecider";
import { usePathname } from "next/navigation";

const navbarStyles = tv({
  slots: {
    list: "flex flex-col h-screen gap-7 list-none p-2 bg-off-black",
    listItem:
      "text-white font-block text-lg border-b border-white p-2 hover:text-secondary active:text-primary",
  },
  variants: {
    active: {
      true: {
        listItem: "text-secondary",
      },
      false: {
        listItem: "",
      },
    },
  },
});

export default function Navbar({
  isOpen,
  setIsOpen,
  navItems,
}: {
  navItems: NavItem[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const styles = navbarStyles();

  return (
    <motion.nav
      animate={{ width: isOpen ? 250 : 50 }}
      className="relative flex-none overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-2 right-2 z-10 text-white"
      >
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </button>
      {isOpen ? (
        <ul className={styles.list()}>
          {navItems.map(({ name, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={styles.listItem({ active: pathname === href })}
              >
                {isOpen ? name : ""}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className={styles.list()}></ul>
      )}
    </motion.nav>
  );
}
