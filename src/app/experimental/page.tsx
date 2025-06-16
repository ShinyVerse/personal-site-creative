import { Metadata } from "next";

import { tv } from "tailwind-variants";

const landingStyles = tv({
  slots: {
    root: "w-full h-screen bg-[#0f0f0f]",
  },
});

export const metadata: Metadata = {};

export default async function ExperimentalPage() {
  const styles = landingStyles();

  return (
    <main className={styles.root()}>
      <section>
        <div className="relative w-max mx-auto">
          <div
            className="bg-primary absolute inset-x-0 top-1/2 -translate-y-[1rem] h-[2rem] md:h-[6rem] md:-translate-y-[2.7rem] z-[1] pointer-events-none transform skew-x-[-16deg] scale-x-112"
            aria-hidden="true"
          />
          <h1 className="relative font-block text-white text-center z-[2] text-[4rem] md:text-[10rem]">
            STOP!
          </h1>
        </div>
      </section>
    </main>
  );
}
