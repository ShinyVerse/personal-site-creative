"use client";

import { useState } from "react";
import Link from "next/link";
import { tv } from "tailwind-variants";
import { motion } from "framer-motion"; // fixed import
import { ChevronRight, ChevronLeft } from "lucide-react";

const navbarStyles = tv({
  slots: {
    list: "flex flex-col h-screen gap-7 list-none p-2 bg-[#0f0f0f]",
    listItem: "text-white font-block text-lg border-b border-white p-2",
  },
});

export default function Navbar() {
  const styles = navbarStyles();
  const [isOpen, setOpen] = useState(true);

  return (
    <motion.nav
      animate={{ width: isOpen ? 250 : 50 }}
      className="relative overflow-hidden flex-none"
    >
      <button
        onClick={() => setOpen(!isOpen)}
        className="absolute top-2 right-2 text-white z-10"
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
