"use client";

import { tv } from "tailwind-variants";
import Image from "next/image";
import { BookOpenText, PaletteIcon, Microscope, BrainCog} from "lucide-react";
import Flower from "../components/Flower";
import PageSection from "../components/PageSection";

const homePageStyles = tv({
  slots: {
    container: "bg-white w-full overflow-hidden max-w-[1800px] mx-auto",
    content: "grid grid-cols-1 lg:grid-cols-2 text-center items-center",
    titleText: "font-bold text-3xl leading-tight",
    bodyText: "text-wrap text-start",
    thin: "!font-thin",
    illustrationSection: "flex  justify-center relative",
    illustrationContainer: "relative w-full aspect-square m-4 lg:m-0",
    flowerOverlay: "absolute top-[11%] right-[40%] w-16 h-16 md:w-20 md:h-20 animate-spin-slower text-brand-pink",
    flowerOverlay2: "absolute bottom-[10%] left-[10%] w-8 h-8 md:w-12 md:h-12 animate-spin-slow text-brand-purple",
    flowerOverlay3: "absolute bottom-[10%] right-[10%] w-10 h-10 md:w-16 md:h-16 animate-spin-slowest text-brand-orange",
    bubblesSection: "mt-[-3%] lg:mt-0 grid grid-cols-1 lg:grid-cols-2 gap-2 font-normal text-white mx-auto  ",
    infoSquare: "bg-primary rounded-md flex flex-col items-start justify-start relative aspect-square shadow-xl/20  min-h-[250px] max-w-[350px] md:w-auto gap-4",
    infoSquareContent: "flex flex-col items-start gap-4 px-4 pb-2 pt-[35%]",
  },
});

export default function HomePage() {
  const styles = homePageStyles();

  return (
    <main className={styles.container()}>
      <PageSection variant="grid" fullHeight className={styles.content()}>
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
        </div>
        
      </PageSection>
    </main>
  );
}
