"use client";

import ImageModal from "./ImageModal";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { PhotoEntries } from "@/lib/photoSchemas";
import { useIsMobile } from "../hooks/useIsMobile";

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

  // Animate when inView changes
  // TODO sort this out.
  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,

        scale: 1,
        transition: { duration: 1 },
      });
    } else {
      controls.start({
        opacity: 0,
        y: -200,

        scale: 0.5,
        transition: { duration: 1 },
      });
    }
  }, [inView, controls]);

  // TODO: fix up styling
  return (
    <section
      ref={ref}
      className="w-full bg-amber-300 flex flex-col items-center justify-center h-screen overflow-hidden"
    >
      <motion.h1
        className="relative text-md lg:text-3xl 2xl:text-5xl "
        initial={{ opacity: 0, y: -500 }}
        animate={
          inView
            ? {
                opacity: 1,
                scale: 5,
                y: isMobile ? -50 : -100,
                transition: { duration: 1 },
              }
            : { opacity: 0, y: -500, transition: { duration: 1 } }
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

      <div className="grid grid-cols-2 2xl:grid-cols-5 gap-5">
        {displayItems.map((item) => (
          <motion.div
            // update to while in view
            // viewport={{ once: true }}
            key={item.fields.title}
            initial={{ opacity: 0, y: -100, scale: 0.5 }}
            animate={controls}
            className="relative w-[150px] h-[150px]  lg:w-[200px] lg:h-[200px]  2xl:w-[250px] 2xl:h-[250px] rounded-md"
          >
            <Image
              onClick={() => setModalItem(item)}
              src={"https:" + item.fields.image.fields.file.url}
              alt={item.fields.altText}
              fill
              className="object-cover rounded-md"
            />
          </motion.div>
        ))}
      </div>
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
