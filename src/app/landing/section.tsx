"use client";

import ImageModal from "./ImageModal";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { tv } from "tailwind-variants";
import { PhotoEntries } from "@/lib/photoSchemas";
import { useIsMobile } from "../hooks/useIsMobile";

import { ChevronRightCircle } from "lucide-react";
import { JazzyLink } from "@/app/components/JazzyLink";

const animatedSectionStyles = tv({
  slots: {
    root: "w-full flex flex-col items-center min-h-screen justify-around mb-8",
    heading:
      "relative text-md md:text-2xl lg:text-3xl font-handwriting text-secondary py-5 md:py-12 lg:py-20",
    grid: "grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-5 pb-5 md:pb-8",
    gridItem:
      "relative w-[150px] h-[150px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] 2xl:w-[275px] 2xl:h-[275px] rounded-md shadow-[0_0_25px] shadow-primary/80",
    image: "object-cover rounded-md",
  },
});

export default function AnimatedSquareSection({
  displayItems,
}: {
  displayItems: PhotoEntries;
}) {
  const isMobile = useIsMobile();
  const [modalItem, setModalItem] = useState<null | (typeof displayItems)[0]>(
    null,
  );

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
    // else {
    //   controls.start({
    //     opacity: 0,
    //     y: -200,
    //     scale: 0.5,
    //     transition: { duration: 1 },
    //   });
    // }
  }, [inView, controls]);

  return (
    <section ref={ref} className={styles.root()}>
      <motion.h1
        className={styles.heading()}
        initial={{ opacity: 0, y: -200 }}
        animate={
          inView && {
            opacity: 1,
            scale: isMobile ? 4 : 5,
            y: 0,
            transition: { duration: 1 },
          }
        }
      >
        Artwork!!!
      </motion.h1>

      {modalItem && (
        <ImageModal
          image={"https:" + modalItem.fields.image.fields.file.url}
          alt={modalItem.fields.altText}
          title={modalItem.fields.title}
          description={
            modalItem.fields.description.content[0].content[0].value ||
            "No description"
          }
          onClose={() => setModalItem(null)}
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
            onClick={() => setModalItem(item)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setModalItem(item);
              }
            }}
          >
            <Image
              src={"https:" + item.fields.image.fields.file.url}
              alt={item.fields.altText}
              fill
              className={styles.image()}
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

// <section className="w-full bg-amber-300 flex items-center justify-center h-screen">
//   <div className="flex flex-col gap-10">
//     {[...Array(5)].map((_, i) => (
//       <motion.div
//         key={i}
//         initial={{ opacity: 0, scale: 0.5, y: -100 }}
//         whileInView={{ opacity: 1, scale: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: i * 0.15 }}
//         viewport={{ once: true }}
//         className="w-32 h-32 bg-blue-500"
//       />
//     ))}
//   </div>
// </section>
