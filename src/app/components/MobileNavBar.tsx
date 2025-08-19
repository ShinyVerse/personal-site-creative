"use client";

import Link from "next/link";
import { tv } from "tailwind-variants";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { NavItem } from "./NavBarDecider";

const navbarStyles = tv({
  slots: {
    container: "fixed top-0 left-0 w-full z-50 bg-off-black overflow-hidden",
    drawButton: "absolute bottom-2 left-1/2 -translate-x-1/2 text-white z-10",
    list: "flex flex-col gap-3 list-none p-2 bg-off-black w-full",
    listItem: "text-white font-block text-sm p-2",
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

export default function MobileNavbar({
  navItems,
  isOpen,
  setIsOpen,
}: {
  navItems: NavItem[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const styles = navbarStyles();
  const pathname = usePathname();

  return (
    <motion.nav
      animate={{ height: isOpen ? 210 : 50 }}
      className={styles.container()}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.drawButton()}
      >
        {isOpen ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
      </button>
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
    </motion.nav>
  );
}
