"use client";
import { PhotoEntries } from "@/lib/photoSchemas";
import Image from "next/image";
import { tv } from "tailwind-variants";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const carouselStyles = tv({
  slots: {
    frame: "relative flex flex-col items-center gap-4 p-4",
    viewport: "overflow-hidden w-full max-w-screen-md",
    track: "flex transition-transform duration-300 ease-in-out",
    card: "relative flex-shrink-0 w-[180px] md:w-[220px] h-[240px] md:h-[280px] m-2 rounded-md border border-gray-300 bg-white shadow",
    image: "rounded-t-md object-cover",
    content: "p-2 text-center",
    title: "text-sm font-semibold truncate",
    navButton:
      "absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow p-3 cursor-pointer z-10",
    icon: "w-5 h-5 text-foreground",
    prevButton: "left-2",
    nextButton: "right-2",
  },
});

export default function GalleryCarousel({
  photos,
  total,
}: {
  photos: PhotoEntries;
  total: number;
}) {
  const styles = carouselStyles();
  const [page, setPage] = useState(1);
  const [data, setData] = useState(photos);

  const disableFetch = useMemo(() => data.length >= total, [data.length]);

  const fetchPhotos = async (page: number) => {
    if (disableFetch) return [];
    const res = await fetch(`/api/photos?page=${page}`);
    if (!res.ok) throw new Error("Failed to fetch photos");
    return res.json();
  };

  const loadNextPhotos = async () => {
    try {
      const newPhotos = await fetchPhotos(page);
      setData(() => [...data, ...newPhotos]);
      setPage(page + 1);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div>
        <div className={styles.track()}>
          {data.map((photo) => {
            const url = "https:" + photo.fields.image.fields.file.url;
            const alt =
              photo.fields.description?.content[0]?.content[0]?.value ||
              "Photo";

            return (
              <div key={photo.sys.id} className={styles.card()}>
                <Image
                  src={url}
                  alt={alt}
                  width={220}
                  height={180}
                  className={styles.image()}
                />
                <div className={styles.content()}>
                  <h3 className={styles.title()}>{photo.fields.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Local scroll buttons */}
      <button
        onClick={loadNextPhotos}
        className={`${styles.navButton()} ${styles.prevButton()}`}
        aria-label="Scroll left"
      >
        <ArrowLeft className={styles.icon()} />
      </button>
      <button
        onClick={() => {}}
        className={`${styles.navButton()} ${styles.nextButton()}`}
        aria-label="Scroll right"
      >
        <ArrowRight className={styles.icon()} />
      </button>
    </div>
  );
}
