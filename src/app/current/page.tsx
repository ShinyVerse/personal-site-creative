"use client";

import { tv } from "tailwind-variants";
import Image from "next/image";
import { BookOpenText, PaletteIcon, Microscope, BrainCog} from "lucide-react";
import SeparatorPill from "../components/SeparatorPill";
import Flower from "../components/Flower";

const homePageStyles = tv({
  slots: {
    container: "bg-white w-full overflow-hidden max-w-[1800px] mx-auto",
    content: "grid grid-cols-1 lg:grid-cols-2 md:gap-14 mx-auto text-center items-center",
    bubblesSection: "grid grid-cols-1 lg:grid-cols-2 gap-2 font-normal text-white mx-auto items-stretch justify-items-center md:justify-items-stretch m-6",
    titleText: " font-normal text-3xl leading-tight font-bold",
    bodyText: "text-wrap max-w-100 text-start",
    thin: "!font-thin",
    illustrationSection: "w-full flex items-center justify-center relative overflow-hidden",
    illustrationContainer: "relative w-full aspect-square max-w-[500px] md:max-w-[550px] lg:max-w-[650px] xl:max-w-[750px]",
    flowerOverlay: "absolute top-[11%] right-[40%] w-16 h-16  md:w-20 md:h-26 animate-spin-slower text-brand-pink",
    flowerOverlay2: "absolute bottom-[10%] left-[10%] w-8 h-8 md:w-12 md:h-12 animate-spin-slow text-brand-purple",
    flowerOverlay3: "absolute bottom-[10%] right-[10%] w-10 h-10 md:w-18 md:h-18 animate-spin-slowest text-brand-orange",

    infoSquare:"bg-primary rounded-md flex-col flex items-start justify-start relative aspect-square shadow-xl/20 w-3/4 md:w-full gap-4",
    infoSquareContent:"flex flex-col items-start gap-4 px-4 pb-8 pt-[35%]"

  },
});

export default function HomePage() {
  const styles = homePageStyles();

  return (
    <main className={styles.container()}>
      <div className={styles.content()}>
        {/* Left Section - Illustration */}

        <div className={styles.illustrationSection()}>
          <div className={styles.illustrationContainer()}>
            <Image
              src="/current-hero.png"
              alt="3D illustration of a cat with abstract background elements"
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


        {/* Right Section - Bubbles */}
        <div className={styles.bubblesSection()}>
          <div className={styles.infoSquare()}>
            <div className={styles.infoSquareContent()}>
              <BrainCog size={50} />
              <p className={styles.titleText()}>Projectwise</p>
              <p className={styles.bodyText()}>Deep diving into product management, business canvases, developing strategies, collecting user research</p>
            </div>
          </div>
          <div className={styles.infoSquare()}>
            <div className={styles.infoSquareContent()}>
              <BookOpenText size={50} />
              <p className={styles.titleText()}>Reading</p>
              <p className={styles.bodyText()}>The Mom Test by Rob Fitzpatrick</p>
            </div>
          </div>
          <div className={styles.infoSquare()}>
            <div className={styles.infoSquareContent()}>
              <Microscope size={50} />
              <p className={styles.titleText()}>Researching</p>
              <p className={styles.bodyText()}>User research specifically within the healthcare space, market analysis, competitive analysis</p>
            </div>
          </div>
          <div className={styles.infoSquare()}>
            <div className={styles.infoSquareContent()}>
              <PaletteIcon size={50} />
              <p className={styles.titleText()}>Artistic</p>
              <p className={styles.bodyText()}>Exploring digital design and abstract positioning</p>
            </div>
          </div>
          {/* <h1 className={`${styles.textLine()}`}>
            Creative
          </h1>
          <SeparatorPill color="pink" />
          <h1 className={`${styles.textLine()} ${styles.thin()}`}>
            Analytical
          </h1>
          <SeparatorPill color="purple" />
          <h1 className={styles.textLine()}>
            Strategic
          </h1> */}
        </div>
        
      </div>
    </main>
  );
}
