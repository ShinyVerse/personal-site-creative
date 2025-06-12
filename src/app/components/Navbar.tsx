"use client";

import Link from "next/link";
import { tv } from "tailwind-variants";

const navbarStyles = tv({
  slots: {
    list: "flex gap-5 list-none p-2",
    listItem: "text-link font-handwriting",
  },
});

export default function Navbar() {
  const styles = navbarStyles();
  return (
    <nav>
      <ul className={styles.list()}>
        <li>
          <Link href="/" className={styles.listItem()}>
            Home
          </Link>
        </li>
        <li className="font-block">
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
    </nav>
  );
}
