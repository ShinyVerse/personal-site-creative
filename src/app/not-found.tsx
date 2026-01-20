"use client";

import { tv } from "tailwind-variants";
import Image from "next/image";
import Link from "next/link";
import FlowerOverlay from "./components/FlowerOverlay";

const notFoundPageStyles = tv({
  slots: {
    section: "h-full w-full flex flex-col items-center justify-center font-normal",
    illustrationContainer: "relative w-full max-w-lg aspect-square",
    title: "text-4xl md:text-l lg:text-3xl font-bold mb-10 text-center text-off-black",
    homeLink: "inline-block px-8 py-4 bg-brand-yellow text-off-black font-bold rounded-3xl hover:bg-brand-yellow/80 transition-colors text-lg md:text-xl mt-2",
  },
});

export default function NotFound() {
  const styles = notFoundPageStyles();

  return (
    <section className={styles.section()}>
      <div className={styles.illustrationContainer()}>
        <Image
          src="/fish.png"
          alt="3D illustration of a fish"
          fill
          className="object-contain"
          priority
        />
        <FlowerOverlay top="5%" left="25%" size="large" color="pink" />
        <FlowerOverlay bottom="20%" left="15%" size="small" color="purple" />
        <FlowerOverlay bottom="10%" right="15%" size="medium" color="pink" />
      </div>
      <h1 className={styles.title()}>Oops! Page not found!</h1>
      <Link href="/" className={styles.homeLink()}>
        Go to Home
      </Link>
    </section>
  );
}
