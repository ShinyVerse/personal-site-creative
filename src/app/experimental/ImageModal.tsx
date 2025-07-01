import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { tv } from "tailwind-variants";

export const imageModalStyles = tv({
  slots: {
    overlay: "fixed inset-0 z-50 bg-black/70 flex items-center justify-center",
    container:
      "relative bg-white pb-2 m-3 w-[90%] max-w-[1000px] rounded-lg outline-none",
    closeButton: "absolute top-3 right-3 w-6 h-6 text-white z-51",
    imageWrapper: "relative w-full h-auto aspect-[4/3] sm:h-1/2",
    image: "object-cover rounded-t-lg",
    content: "p-6 space-y-2",
    title: "text-lg font-semibold",
    description: "text-sm text-zinc-600",
  },
});

export default function ImageModal({
  image,
  title,
  alt,
  description,
  onClose,
}: {
  title: string;
  image: string;
  alt: string;
  description: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const {
    overlay,
    container,
    closeButton,
    imageWrapper,
    image: imageClass,
    content,
    title: titleClass,
    description: descriptionClass,
  } = imageModalStyles();

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  return (
    <div className={overlay()} onClick={onClose} role="presentation">
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={container()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={closeButton()}
          aria-label="Close modal"
        >
          <X />
        </button>
        <div className={imageWrapper()}>
          <Image
            src={image}
            alt={alt}
            fill
            className={imageClass()}
            sizes="(max-width: 640px) 100vw, 100%"
          />
        </div>
        <div className={content()}>
          <h2 id="modal-title" className={titleClass()}>
            {title}
          </h2>
          <p id="modal-description" className={descriptionClass()}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
