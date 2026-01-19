"use client";

import { tv } from "tailwind-variants";
import Image from "next/image";
import SeparatorPill from "../components/SeparatorPill";
import FlowerOverlay from "../components/FlowerOverlay";
import PageSection from "../components/PageSection";

const homePageStyles = tv({
  slots: {
    container: "h-full bg-white w-full overflow-hidden max-w-[1800px] mx-auto",
    content: "grid grid-cols-1 lg:grid-cols-2  md:gap-0 px-0 mx-auto text-center items-center h-full",
    textSection: "flex flex-col gap-0.5 md:gap-2 font-normal",
    textLine: "text-black font-normal text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-tight font-bold",
    thin: "!font-thin",
    illustrationSection: "flex items-center justify-center relative",
    illustrationContainer: "relative w-full aspect-square max-w-[500px] md:max-w-[550px] lg:max-w-[800px] xl:max-w-[1000px] md:ml-11",
  },
});

export default function HomePage() {
  const styles = homePageStyles();

  return (
    <main className={styles.container()}>
      <PageSection variant="grid" fullHeight className={styles.content()}>
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
              src="/more-real.png"
              alt="3D illustration of a woman with abstract background elements"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            />
            <FlowerOverlay top="12%" right="23%" size="large" color="pink" />
            <FlowerOverlay bottom="20%" left="10%" size="small" color="purple" />
            <FlowerOverlay bottom="30%" right="10%" size="medium" color="orange" />
          </div>
        </div>
        
      </PageSection>
    </main>
  );
}
