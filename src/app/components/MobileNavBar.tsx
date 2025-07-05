"use client";

import Link from "next/link";
import { tv } from "tailwind-variants";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

const navbarStyles = tv({
  slots: {
    container: "fixed top-0 left-0 w-full z-50 bg-[#0f0f0f] overflow-hidden ",
    drawButton: "absolute bottom-2 left-1/2 -translate-x-1/2 text-white z-10",
    list: "flex flex-col gap-3 list-none p-2 bg-[#0f0f0f] w-full ",
    listItem: "text-white font-block text-sm p-2 active:text-primary",
  },
});

export default function MobileNavbar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const styles = navbarStyles();

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
        <li>
          <Link href="/" className={styles.listItem()}>
            {isOpen ? "Home" : ""}
          </Link>
        </li>
        <li>
          <Link className={styles.listItem()} href="/artwork">
            Artwork
          </Link>
        </li>
        <li>
          <Link className={styles.listItem()} href="/about">
            About
          </Link>
        </li>
        <li>
          <Link className={styles.listItem()} href="/career">
            Career Portfolio
          </Link>
        </li>
        <li>
          <Link className={styles.listItem()} href="/experimental">
            Experimental
          </Link>
        </li>
      </ul>
    </motion.nav>
  );
}
