import { ChevronRightCircle } from "lucide-react";
import { Metadata } from "next";
import { tv } from "tailwind-variants";

import AnimatedSquareSection from "./section";
import { fetchContentfulEntries } from "@/lib/contentfulHelpers";
import { PhotoEntriesSchema } from "@/lib/photoSchemas";
import { JazzyLink } from "@/app/components/JazzyLink";
import { JobEntriesSchema } from "@/lib/jobEntrySchemas";
import { FeaturedJobs } from "../components/FeaturedJobs";
import { MainHeader } from "../components/MainHeader";

const landingStyles = tv({
  slots: {
    root: "flex flex-col bg-off-black w-full items-center place-content-between align-center",
    container: "relative w-full md:w-max",
    ctaWrapper: "justify-items-center items-center w-full ",
    section: "flex flex-col justify-around min-h-screen items-center",
    textBlock:
      "text-lato text-white text-xl font-block font-medium text-center mb-2",
    // h1: "relative mt-2 z-[2] font-block text-white text-center text-[6rem] md:text-[12rem]",
    // bgStripe:
    //   "absolute inset-x-0 top-1/2 -translate-y-1/2 h-[3rem] bg-primary md:h-[6rem] md:skew-x-[-16deg] md:scale-x-112 z-[1] pointer-events-none",
    paragraph: "text-xl py-3 px-4 lg:px-0 text-white",
  },
});

export const metadata: Metadata = {};

export default async function LandingPage() {
  const styles = landingStyles();

  const photosResult = await fetchContentfulEntries("photo", PhotoEntriesSchema);
  const jobsResult = await fetchContentfulEntries("jobEntry", JobEntriesSchema);

  return (
    <main className={styles.root()}>
      <section className="flex h-screen w-full flex-col items-center justify-between overflow-hidden">
        <section className={styles.section()}>
          <MainHeader title="STOP!" />

          <div className={styles.ctaWrapper()}>
            <h2 className={styles.textBlock()}>
              Great. Now that I have your attention...
            </h2>
            <JazzyLink
              // href="#about"
              href="/about"
              // isAnchor
              icon={<ChevronRightCircle />}
              title="Come get to know me"
            />
          </div>
        </section>
      </section>

      <section className="bg-off-black mt-4 mb-8 flex min-h-screen w-full flex-col items-center justify-around overflow-hidden">
        {jobsResult.success && <FeaturedJobs jobs={jobsResult.data} />}
        <JazzyLink
          href="/career"
          icon={<ChevronRightCircle />}
          title="Curious for more details?"
        />
      </section>
      {photosResult.success && (
        <AnimatedSquareSection displayItems={photosResult.data} />
      )}
    </main>
  );
}
