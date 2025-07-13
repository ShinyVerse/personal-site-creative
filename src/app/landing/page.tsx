import { ChevronRightCircle } from "lucide-react";
import { Metadata } from "next";
import { tv } from "tailwind-variants";

import AnimatedSquareSection from "./section";
import { client } from "@/lib/contentfulClient";
import { PhotoEntriesSchema } from "@/lib/photoSchemas";
import { JazzyLink } from "@/app/components/JazzyLink";
import { NeonImage } from "@/app/components/NeonImage";
import { JobEntriesSchema } from "@/lib/jobEntrySchemas";
import { FeaturedJobs } from "../components/FeaturedJobs";

const aboutList = [
  {
    src: "/art2.mp4",
    title: "Paint, Pixels & Possibilities",
    description: `Often caught scribbling in a sketchpad, experimenting in Procreate,
            or tinkering with a stubborn traditional piece. I'm on a gentle
            quest to find my style, currently working on a deeper understanding
            of faces and expressions. Forever chasing curious techniques, making
            brushes of my own, and seeing where the inspiration takes me. Some
            works evolve beyond expectation; others find completion earlier than
            imagined.`,
  },
  {
    src: "/code-neon.mp4",
    title: "Sowing and growing",
    description: `Tending my garden with care, growing food for the table and flowers
            for the soul. Organically keeping pests at bay by making use of lure
            and companion plants. Some of my favorites to grow are potatoes,
            beans, corn, snapdragons, and sage.`,
  },
  {
    src: "/code-neon.mp4",
    title: "From Sims to Syntax",
    description: `I didn't start out as a developer and had little interaction
            with computers early on—except for games. Most of my career has been
            focused on React Native, a dash of Backend, and recently I've
            been enjoying the new challenges that Next.js brings. I see myself
            as a product developer who cares deeply about the people using what
            I build. I'm driven by creating thoughtful, user-friendly
            solutions that make a real difference, blending creativity with
            practical problem-solving.`,
  },
  {
    src: "/code-neon.mp4",
    title: "A Butter-Spattered Feeder",
    description: `A passionate feeder who explores global cuisines with curiosity and
            glee. Restaurants spark inspiration, guiding playful recreations and
            original dishes at home. From hand-pulled noodles to decorated
            cakes, what lands on the table depends entirely on the weather, what
            the cupboards hold—and the whim.`,
  },
];

const landingStyles = tv({
  slots: {
    root: "flex flex-col bg-black w-full items-center place-content-between align-center",
    container: "relative w-full md:w-max",
    ctaWrapper: "justify-items-center items-center w-full ",
    section: "flex flex-col justify-around min-h-screen",
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
      <section className="flex h-screen w-full flex-col items-center justify-between overflow-hidden">
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
              href="#about"
              isAnchor
              icon={<ChevronRightCircle />}
              title="Come get to know me"
            />
          </div>
        </section>
      </section>

      <section
        id="about"
        className="p3 bg-black- flex min-h-screen w-full flex-col justify-center justify-items-center"
      >
        {aboutList.map((aboutItem, index) => (
          <div
            key={index}
            className={`${styles.textBlock()} font-block mx-4 flex flex-col gap-6 py-2 text-center md:flex-row md:text-left`}
          >
            <NeonImage src={aboutItem.src} />
            <div className="flex flex-col justify-center">
              <h2 className="text-secondary border-primary my-3 inline-block self-center border-b-2 py-2 text-lg font-medium md:self-start md:text-2xl lg:text-2xl">
                {aboutItem.title}
              </h2>
              <p className="font-handwriting text-2xl md:text-3xl lg:text-4xl">
                {aboutItem.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-4 mb-8 flex min-h-screen max-w-screen min-w-full flex-col items-center justify-around justify-items-center overflow-hidden bg-black not-last:w-full">
        {parsedJobs?.data && <FeaturedJobs jobs={parsedJobs.data} />}
        <JazzyLink
          href="/about"
          icon={<ChevronRightCircle />}
          title="Curious for more details?"
        />
      </section>
      {parsedPhotos.data && (
        <AnimatedSquareSection displayItems={parsedPhotos.data} />
      )}
    </main>
  );
}
