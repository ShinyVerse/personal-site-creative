import { ChevronRightCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { tv } from "tailwind-variants";

import AnimatedSquareSection from "./section";
import { client } from "@/lib/contentfulClient";
import { PhotoEntriesSchema } from "@/lib/photoSchemas";

const landingStyles = tv({
  slots: {
    root: "flex flex-col w-full bg-[#0f0f0f] items-center place-content-between",
    container: "relative w-full md:w-max mx-auto",
    ctaWrapper: "mt-auto mb-30 justify-items-center items-center w-full ",
    section: "flex flex-col items-center h-screen",
    textBlock:
      "text-lato text-white text-xl font-block font-medium text-center",
    cta: "border-2 border-secondary font-bold text-white rounded-2xl flex flex-row justify-center items-center gap-2 mt-4 px-6 py-3 hover:text-secondary active:bg-primary active:border-primary active:text-black w-full max-w-[300px]",
    h1: "relative mt-2 z-[2] font-block text-white text-center text-[6rem] md:text-[12rem]",
    bgStripe:
      "absolute inset-x-0 top-1/2 -translate-y-1/2 h-[3rem] bg-primary md:h-[6rem] md:skew-x-[-16deg] md:scale-x-112 z-[1] pointer-events-none",
  },
});

export const metadata: Metadata = {};

export default async function ExperimentalPage() {
  const styles = landingStyles();
  const res = await client.getEntries({ content_type: "photo" });
  const photos = res.items;
  const parsedPhotos = PhotoEntriesSchema.safeParse(photos);

  return (
    <main className={styles.root()}>
      <section className={styles.section()}>
        <section className={styles.container()}>
          <div className={styles.bgStripe()} aria-hidden="true" />
          <h1 className={styles.h1()}>STOP!</h1>
        </section>

        <div className={styles.ctaWrapper()}>
          <h2 className={styles.textBlock()}>
            Great. Now that I have your attention...
          </h2>
          <Link href="/about" className={styles.cta()}>
            Come get to know me <ChevronRightCircle />
          </Link>
        </div>
      </section>

      {parsedPhotos.data && (
        <AnimatedSquareSection displayItems={parsedPhotos.data} />
      )}

      <section className="w-full bg-blue-900 flex items-center justify-center h-screen" />
      <section className="w-full bg-red-800 flex items-center justify-center h-screen" />
    </main>
  );
}
