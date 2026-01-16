"use client";

import { tv } from "tailwind-variants";
import Image from "next/image";
import SeparatorPill from "../components/SeparatorPill";
import Flower from "../components/Flower";

const homePageStyles = tv({
  slots: {
    container: "bg-white w-full overflow-hidden max-w-[1800px] mx-auto",
    content: "grid grid-cols-1 lg:grid-cols-2  md:gap-8 px-0 py-16 mx-auto text-center items-center",
    textSection: "flex flex-col gap-0.5 md:gap-2 font-normal",
    textLine: "text-black font-normal text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-tight font-bold",
    thin: "!font-thin",
    illustrationSection: "w-full flex items-center justify-center relative ml-3 md:ml-11 overflow-hidden",
    illustrationContainer: "relative w-full aspect-square max-w-[500px] md:max-w-[550px] lg:max-w-[650px] xl:max-w-[750px]",
    flowerOverlay: "absolute top-[12%] right-[23%] w-16 h-16 md:right-[19%] md:w-26 md:h-26 animate-spin-slower text-brand-pink",
    flowerOverlay2: "absolute bottom-[20%] left-[10%] w-8 h-8 md:w-12 md:h-12 animate-spin-slow text-brand-purple",
    flowerOverlay3: "absolute bottom-[30%] right-[10%] w-10 h-10 md:w-18 md:h-18 animate-spin-slowest text-brand-orange",
  },
});

export default function HomePage() {
  const styles = homePageStyles();

  return (
    <main className={styles.container()}>
      <div className={styles.content()}>
        {/* Left Section - Text */}
        <div className={styles.textSection()}>
          <h1 className={`${styles.textLine()}`}>
            Creative
          </h1>
          <SeparatorPill color="pink" />
          <h1 className={`${styles.textLine()} ${styles.thin()}`}>
            Analytical
          </h1>
          <SeparatorPill color="purple" />
          <h1 className={styles.textLine()}>
            Strategic
          </h1>
        </div>

        {/* Right Section - Illustration */}
        <div className={styles.illustrationSection()}>
          <div className={styles.illustrationContainer()}>
            <Image
              src="/hero-without.png"
              alt="3D illustration of a woman with abstract background elements"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            />
            <div className={styles.flowerOverlay()}>
              <Flower />
            </div>
            <div className={styles.flowerOverlay2()}>
              <Flower />
            </div>
            <div className={styles.flowerOverlay3()}>
              <Flower />
            </div>
          </div>
        </div>
        
      </div>
    </main>
  );
}
