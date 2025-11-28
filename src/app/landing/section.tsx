"use client";

import ImageModal from "@/app/components/Modals/ImageModal";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { tv } from "tailwind-variants";
import { PhotoEntries } from "@/lib/photoSchemas";
import { useModal } from "../hooks/useModal";

import { ChevronRightCircle } from "lucide-react";
import { JazzyLink } from "@/app/components/JazzyLink";
import { MainHeader } from "../components/MainHeader";

const animatedSectionStyles = tv({
  slots: {
    root: "w-full flex flex-col items-center min-h-screen justify-around mb-8",
    grid: "grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-5 pb-5 md:pb-8",
    gridItem:
      "relative w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] 2xl:w-[275px] 2xl:h-[275px] rounded-md shadow-[0_0_10px] shadow-primary/80",
    image: "object-cover rounded-md",
  },
});

export default function AnimatedSquareSection({
  displayItems,
}: {
  displayItems: PhotoEntries;
}) {

  const modal = useModal<(typeof displayItems)[0]>();

  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  const styles = animatedSectionStyles();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 1 },
      });
    }

  }, [inView, controls]);

  return (
    <section ref={ref} className={styles.root()}>
      <MainHeader title="ARTWORKS" size="medium" bgColour="bg-secondary" />


      {modal.isOpen && modal.data && (
        <ImageModal
          image={"https:" + modal.data.fields.image.fields.file.url}
          alt={modal.data.fields.altText}
          title={modal.data.fields.title}
          description={
            modal.data.fields.description.content[0].content[0].value ||
            "No description"
          }
          onClose={modal.close}
        />
      )}

      <div className={styles.grid()}>
        {displayItems.map((item) => (
          <motion.div
            tabIndex={0}
            role="button"
            key={item.fields.title}
            initial={{ opacity: 0, y: -100, scale: 0.5 }}
            animate={controls}
            className={styles.gridItem()}
            onClick={() => modal.open(item)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                modal.open(item);
              }
            }}
          >
            <Image
              src={"https:" + item.fields.image.fields.file.url}
              alt={item.fields.altText}
              fill
              className={styles.image()}
              loading="lazy"
              sizes="(max-width: 640px) 150px, (max-width: 1024px) 200px, (max-width: 1536px) 250px, 275px"
            />
          </motion.div>
        ))}
      </div>
      <JazzyLink
        href="https://www.instagram.com/supershinyverse/"
        icon={<ChevronRightCircle />}
        title="Want to see more?"
        rel
        target
      />
    </section>
  );
}