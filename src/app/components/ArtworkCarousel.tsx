"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
    <div className="flex flex-col items-center">
      <div className="border border-black border-1 rounded-lg p-4 bg-grey">
        <div className="border border-black border-4 rounded-lg p-4 bg-white">
          <Image
            src={"https:" + current.fields.image.fields.file.url}
            alt={current.fields.altText}
            width={600}
            height={600}
            className="w-[300px] h-[300px] md:w-[500px] md:h-[500px]  object-cover rounded-md"
          />
        </div>
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-xl font-semibold">{current.fields.title}</h2>
        {current.fields.description && (
          <p>
            {current.fields.description.content[0].content[0].value ||
              "No description"}
          </p>
        )}
        <button
          onClick={goPrev}
          className="absolute top-1/2 left-0 p-4 bg-white rounded-full text-4xl text-center"
        >
          <ArrowLeft />
        </button>
        <button
          onClick={goNext}
          className="absolute top-1/2 right-0 p-4 bg-white rounded-full text-4xl text-center"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};
