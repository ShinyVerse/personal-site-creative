"use client";

import { tv } from "tailwind-variants";
import { useMemo } from "react";
import Image from "next/image";
import { PhotoEntries, PhotoEntry } from "@/lib/photoSchemas";
import PolaroidModal from "@/app/components/Modals/PolaroidModal";
import { useModal } from "@/app/hooks/useModal";

export const carouselStyles = tv({
  slots: {
    frame: "w-full",
    // Frame container sized to show ~3.5 Polaroids: 
    // Each Polaroid ~352px (320px image + 32px padding) + 24px gap
    // 3.5 * 352px + 2.5 * 24px = 1232px + 60px = ~1292px, add frame padding
    frameContainer: "p-6 w-full mx-auto ",
    // Add padding to allow space for scaled/rotated Polaroids on hover
    scrollContainer: "flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide py-4 px-2 justify-center",
    scrollContainerInner: "flex gap-6 min-w-max",
    polaroid: "w-[280px] md:w-[320px] flex-shrink-0 bg-white p-4 pb-6 shadow-lg transform transition-transform hover:scale-105 hover:z-10 cursor-pointer flex flex-col origin-center",
    polaroidImageWrapper: "w-full h-[240px] md:h-[300px] relative overflow-hidden bg-gray-50",
    polaroidImage: "w-full h-full object-cover",
    content: "mt-4 text-center px-2",
    title: "text-lg font-semibold text-gray-800",
  },
});

export const Polaroid = ({
  photo,
  index,
  onOpen
}: {
  photo: PhotoEntry;
  index: number;
  onOpen: (photo: PhotoEntry) => void;
}) => {
  const styles = carouselStyles();

  // Alternate rotation angles for a natural Polaroid effect
  const rotation = useMemo(() => {
    const rotations = [-2, 1, -1.5, 2, -1, 1.5];
    return rotations[index % rotations.length];
  }, [index]);

  return (
    <div
      className={styles.polaroid()}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
      onClick={() => onOpen(photo)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(photo);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View ${photo.fields.title}`}
    >
      <div className={styles.polaroidImageWrapper()}>
        <Image
          src={"https:" + photo.fields.image.fields.file.url}
          alt={photo.fields.altText}
          fill
          className={styles.polaroidImage()}
          loading="lazy"
          sizes="(max-width: 768px) 280px, 320px"
        />
      </div>
      <div className={styles.content()}>
        <h2 className={styles.title()}>{photo.fields.title}</h2>
      </div>
    </div>
  );
};

const Carousel = ({ photos }: { photos: PhotoEntries }) => {
  const styles = carouselStyles();
  const modal = useModal<PhotoEntry>();

  return (
    <>
      {modal.isOpen && modal.data && (
        <PolaroidModal
          image={"https:" + modal.data.fields.image.fields.file.url}
          alt={modal.data.fields.altText}
          title={modal.data.fields.title}
          description={
            modal.data.fields.description.content[0]?.content[0]?.value ||
            "No description"
          }
          onClose={modal.close}
        />
      )}
      <div className={styles.frameContainer()} aria-label="Photo carousel">
        <div className={styles.frame()}>
          <div className={styles.scrollContainer()}>
            <div className={styles.scrollContainerInner()}>
              {photos.map((photo, index) => (
                <Polaroid
                  key={photo.sys.id || index}
                  photo={photo}
                  index={index}
                  onOpen={modal.open}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
export { Carousel };
