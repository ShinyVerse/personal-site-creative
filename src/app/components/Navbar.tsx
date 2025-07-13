"use client";

import Link from "next/link";
import { tv } from "tailwind-variants";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

const navbarStyles = tv({
  slots: {
    list: "flex flex-col h-screen gap-7 list-none p-2 bg-black",
    listItem:
      "text-white font-block text-lg border-b border-white p-2 hover:text-secondary active:text-primary",
  },
});

export default function Navbar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
        <ul className={`${styles.list()} w-full`}>
          <li>
            <Link href="/" className={styles.listItem()}>
              Home
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
              Landing
            </Link>
          </li>
        </ul>
      ) : (
        <ul className={styles.list()}></ul>
      )}
    </motion.nav>
  );
}
