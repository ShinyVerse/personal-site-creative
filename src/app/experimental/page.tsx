import { ChevronRightCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import { tv } from "tailwind-variants";

const landingStyles = tv({
  slots: {
    root: "flex flex-col w-full bg-[#0f0f0f] items-center place-content-between ",
  },
});

export const metadata: Metadata = {};

export default async function ExperimentalPage() {
  const styles = landingStyles();

  // Move this somewhere decent:
  //     <section>
  //       <div className="relative w-max mx-auto md:mt-10">
  //         <div
  //           className="bg-primary absolute inset-x-0 top-1/2 -translate-y-[1.5rem] h-[3rem] md:h-[6rem] md:-translate-y-[2.7rem] z-[1] pointer-events-none transform skew-x-[-16deg] scale-x-112"
  //           aria-hidden="true"
  //         />
  //         <h1 className="relative font-block text-white text-center z-[2] text-[5rem] md:text-[12rem]">
  //           STOP!
  //         </h1>
  //       </div>
  //     </section>

  return (
    <main className={styles.root()}>
      <section className="flex flex-col items-center h-screen">
        <section className="relative w-full md:w-max mx-auto">
          <div
            className="
        absolute inset-x-0 top-1/2 -translate-y-1/2 h-[3rem] 
        bg-primary 
        md:h-[6rem] 
        md:skew-x-[-16deg] md:scale-x-112 
        z-[1] pointer-events-none
      "
            aria-hidden="true"
          />
          <h1 className="relative mt-2 z-[2] font-block text-white text-center text-[6rem] md:text-[12rem]">
            STOP!
          </h1>
        </section>

        <div className="mt-auto mb-30 text-center">
          <h2 className="text-lato text-white text-xl font-block font-medium">
            Great. Now that I have your attention...
          </h2>
          <Link
            href="/about"
            className="border-2 border-secondary font-bold text-white rounded-2xl flex flex-row justify-center items-center gap-2 mt-4 px-6 py-3 hover:text-secondary active:bg-primary active:border-primary active:text-black"
          >
            Come get to know me <ChevronRightCircle />
          </Link>
        </div>
      </section>
      <section className="w-full bg-amber-300 flex items-center justify-center h-screen">
        {/* STOP! content */}
      </section>
      <section className="w-full bg-blue-900 flex items-center justify-center h-screen">
        {/* Great. Now that I have your attention... */}
      </section>

      <section className="w-full bg-red-800 flex items-center justify-center h-screen">
        {/* Whatever comes next */}
      </section>
    </main>
  );
}
