"use client";

import { useState } from "react";
import Image from "next/image";
import { PhotoEntries } from "@/lib/photoSchemas";

export const Carousel = ({ photos }: { photos: PhotoEntries }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const current = photos[currentIndex];

  return (
    <div>
      <Image
        src={"https:" + current.fields.image.fields.file.url}
        alt={current.fields.altText}
        width={600}
        height={600}
      />

      <div className="text-center space-y-1">
        <h2 className="text-xl font-semibold">{current.fields.title}</h2>
        {current.fields.description && (
          <p>
            {current.fields.description.content[0].content[0].value ||
              "No description"}
          </p>
        )}
      </div>
      <button
        onClick={goPrev}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/70 px-2 py-1"
      >
        ←
      </button>
      <button
        onClick={goNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white/70 px-2 py-1"
      >
        →
      </button>
    </div>
  );
};
