import { ChevronRightCircle } from "lucide-react";
import { Metadata } from "next";
import { tv } from "tailwind-variants";

import AnimatedSquareSection from "./section";
import { client } from "@/lib/contentfulClient";
import { PhotoEntriesSchema } from "@/lib/photoSchemas";
import { JazzyLink } from "@/app/components/JazzyLink";
import { JobEntriesSchema } from "@/lib/jobEntrySchemas";
import { FeaturedJobs } from "../components/FeaturedJobs";

const landingStyles = tv({
  slots: {
    root: "flex flex-col w-full bg-[#0f0f0f] items-center place-content-between align-center",
    container: "relative w-full md:w-max",
    ctaWrapper: "justify-items-center items-center w-full",
    section: "flex flex-col justify-evenly h-full",
    textBlock:
      "text-lato text-white text-xl font-block font-medium text-center mb-2",
    h1: "relative mt-2 z-[2] font-block text-white text-center text-[6rem] md:text-[12rem]",
    bgStripe:
      "absolute inset-x-0 top-1/2 -translate-y-1/2 h-[3rem] bg-primary md:h-[6rem] md:skew-x-[-16deg] md:scale-x-112 z-[1] pointer-events-none",
  },
});

export const metadata: Metadata = {};

export default async function LandingPage() {
  const styles = landingStyles();
  const res = await client.getEntries({ content_type: "photo" });
  const photos = res.items;
  const parsedPhotos = PhotoEntriesSchema.safeParse(photos);

  const resJob = await client.getEntries({
    content_type: "jobEntry",
  });
  const jobs = resJob.items;

  const parsedJobs = JobEntriesSchema.safeParse(jobs);

  return (
    <main className={styles.root()}>
      <section className="w-full bg-off-black flex flex-col items-center h-screen justify-between mt-4 overflow-hidden">
        <section className={styles.section()}>
          <section className={styles.container()}>
            <div className={styles.bgStripe()} aria-hidden="true" />
            <h1 className={styles.h1()}>STOP!</h1>
          </section>

          <div className={styles.ctaWrapper()}>
            <h2 className={styles.textBlock()}>
              Great. Now that I have your attention...
            </h2>
            <JazzyLink
              href="/about"
              icon={<ChevronRightCircle />}
              title="Come get to know me"
            />
          </div>
        </section>
      </section>

      {parsedPhotos.data && (
        <AnimatedSquareSection displayItems={parsedPhotos.data} />
      )}

      <section className=" flex flex-col not-last:w-full bg-off-black items-center h-screen justify-around mt-4 overflow-hidden justify-items-center">
        {parsedJobs?.data && <FeaturedJobs jobs={parsedJobs.data} />}
        <JazzyLink
          href="/career"
          icon={<ChevronRightCircle />}
          title="Curious for more details?"
        />
      </section>
      <section className="w-full bg-red-800 flex items-center justify-center h-screen" />
    </main>
  );
}
