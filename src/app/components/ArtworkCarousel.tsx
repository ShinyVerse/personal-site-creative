"use client";

import { tv } from "tailwind-variants";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { PhotoEntries } from "@/lib/photoSchemas";

export const carouselStyles = tv({
  slots: {
    frame: "flex flex-col items-center gap-4 p-4",
    outerBorder: "border border-black border-1 rounded-lg p-4 bg-grey",
    innerBorder: "border border-black border-4 rounded-lg p-4 bg-white",
    image:
      "w-[300px] h-[300px] md:w-[400px] md:h-[400px]  object-cover rounded-md",
    content: "text-center space-y-1",
    title: "text-xl font-semibold",
    description: "text-sm text-muted-foreground",
    navButton:
      "absolute top-1/2 transform -translate-y-1/2 rounded-full bg-white shadow p-4",
    icon: "w-6 h-6 text-foreground",
  },
});

export const Carousel = ({ photos }: { photos: PhotoEntries }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const styles = carouselStyles();

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const current = photos[currentIndex];

  return (
    <section className={styles.frame()} aria-label="Photo carousel">
      <div className={styles.outerBorder()}>
        <div className={styles.innerBorder()}>
          <Image
            src={"https:" + current.fields.image.fields.file.url}
            alt={current.fields.altText}
            width={600}
            height={600}
            className={styles.image()}
          />
        </div>
      </div>

      <div className={styles.content()}>
        <h2 className={styles.title()}>{current.fields.title}</h2>
        {current.fields.description && (
          <p className={styles.description()}>
            {current.fields.description.content[0].content[0].value ||
              "No description"}
          </p>
        )}
      </div>

      <button
        onClick={goPrev}
        className={`${styles.navButton()} left-4`}
        aria-label="Previous slide"
      >
        <ArrowLeft className={styles.icon()} />
      </button>
      <button
        onClick={goNext}
        className={`${styles.navButton()} right-4`}
        aria-label="Next slide"
      >
        <ArrowRight className={styles.icon()} />
      </button>
    </section>
  );
};
