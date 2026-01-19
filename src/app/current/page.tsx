"use client";

import { tv } from "tailwind-variants";
import Image from "next/image";
import { BookOpenText, PaletteIcon, Microscope, BrainCog } from "lucide-react";
import FlowerOverlay from "../components/FlowerOverlay";
import PageSection from "../components/PageSection";

const nowPageStyles = tv({
  slots: {
    container: "bg-white w-full overflow-hidden max-w-[1800px] mx-auto",
    content: "grid grid-cols-1 lg:grid-cols-2 items-start",
    titleText: "font-bold text-3xl md:text-1xl lg:text-2xl leading-tight mt-2",
    bodyText: "text-wrap text-start",
    illustrationSection: "flex relative",
    illustrationContainer: "relative w-full aspect-square m-4 lg:m-0",
    cardsSection: "mt-[-3%] lg:mt-0 grid grid-cols-1 lg:grid-cols-2 gap-2 font-normal text-white mx-auto",
    infoSquare: "rounded-md flex flex-col items-start justify-start relative aspect-square shadow-xl/20 min-h-[250px] max-w-[350px] md:w-auto gap-4 mt-4",
    infoSquareContent: "flex flex-col items-start gap-3 px-4 pb-2 pt-[35%] md:pt-[15%] xl:pt-[35%]",
  },
});


const nowEntryColors = [
  "bg-brand-purple",  
  "bg-primary",      
  "bg-primary",  
  "bg-brand-purple",  
];

const nowEntries = [
  {
    icon: BrainCog,
    title: "Projectwise",
    description: "Deep diving into product management, business canvases, developing strategies, collecting user research",
  },
  {
    icon: BookOpenText,
    title: "Reading",
    description: "The Mom Test by Rob Fitzpatrick",
  },
  {
    icon: Microscope,
    title: "Researching",
    description: "User research specifically within the healthcare space, market analysis, competitive analysis",
  },
  {
    icon: PaletteIcon,
    title: "Artistic",
    description: "Exploring digital design and abstract positioning",
  },

];

export default function CurrentPage() {
  const styles = nowPageStyles();

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
            <FlowerOverlay top="11%" right="40%" size="large" color="pink" />
            <FlowerOverlay bottom="10%" left="10%" size="small" color="purple" />
            <FlowerOverlay bottom="10%" right="10%" size="medium" color="orange" />
          </div>
        </div>

        {/* Right Section - Cards Grid */}
        <div className={styles.cardsSection()}>
          {nowEntries.map((entry, idx) => {
            const IconComponent = entry.icon;
            const bgColor = nowEntryColors[idx % 4];
            return (
              <div key={entry.title} className={`${styles.infoSquare()} ${bgColor}`}>
                <div className={styles.infoSquareContent()}>
                  <IconComponent className="text-white w-[50px] h-[50px] md:w-[30px] md:h-[30px] xl:w-[50px] xl:h-[50px]" />
                  <p className={styles.titleText()}>{entry.title}</p>
                  <p className={styles.bodyText()}>{entry.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </PageSection>
    </main>
  );
}