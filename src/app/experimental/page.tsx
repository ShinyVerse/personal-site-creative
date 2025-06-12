import { Metadata } from "next";

import { tv } from "tailwind-variants";

const landingStyles = tv({
  slots: {
    root: "w-full h-full bg-[#1e1e1e]",
  },
});

export const metadata: Metadata = {
  // title: "Laura Jackson Recent Artwork",
  // description:
  //   "Showcases the top most recent art pieces and gives some insight into my process.",
};

export default async function ExperimentalPage() {
  const styles = landingStyles();

  return (
    <main className={styles.root()}>
      <section>
        <div className="relative w-max mx-auto px-20">
          <div
            className="bg-red-900 absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2rem] md:h-[5.5rem] z-[1] pointer-events-none"
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
