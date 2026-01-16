"use client";

import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { tv } from "tailwind-variants";
import { NavItem } from "./NavBarDecider";

const navbarStyles = tv({
  slots: {
    container: "fixed top-0 left-0 w-full z-50 bg-white overflow-hidden border-b border-gray-200",
    drawButton: "absolute bottom-2 left-1/2 -translate-x-1/2 text-black z-10",
    list: "flex flex-col gap-3 list-none p-2 bg-white w-full",
    listItem: "text-black font-normal text-sm p-2",
    buttonItem: "bg-[#FFC857] text-black font-normal text-sm p-2 rounded-lg text-center",
  },
  variants: {
    active: {
      true: {
        listItem: "text-[#d52a7a]",
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
      animate={{ height: isOpen ? navItems.length * 45 : 50 }}
      className={styles.container()}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.drawButton()}
      >
        {isOpen ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
      </button>
      <ul className={styles.list()}>
        {navItems.map(({ name, href, isButton }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={() => setIsOpen(false)}
              className={
                isButton
                  ? styles.buttonItem()
                  : styles.listItem({ active: pathname === href })
              }
            >
              {isOpen ? name : ""}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
