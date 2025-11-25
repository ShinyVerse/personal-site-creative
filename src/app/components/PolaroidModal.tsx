import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { tv } from "tailwind-variants";

const polaroidModalStyles = tv({
  slots: {
    overlay:
      "w-full fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 ",
    container:
      "relative bg-white p-6 pb-8 md:pb-10 shadow-2xl max-w-[90vw] md:max-w-[700px] outline-none transform rounded-lg",
    closeButton: 
      "absolute top-4 right-4 w-8 h-8 text-gray-700 hover:text-gray-900 z-10 bg-white rounded-full p-1.5 shadow-md hover:shadow-lg transition-shadow",
    imageWrapper: "relative w-full bg-gray-50 overflow-hidden",
    image: "object-contain",
    content: "mt-4 md:mt-5 text-center space-y-1.5 md:space-y-2 px-2",
    title: "text-xl md:text-2xl font-semibold text-gray-800",
    description: "text-sm md:text-base text-gray-600",
  },
});

export default function PolaroidModal({
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
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const {
    overlay,
    container,
    closeButton,
    imageWrapper,
    image: imageClass,
    content,
    title: titleClass,
    description: descriptionClass,
  } = polaroidModalStyles();

  useEffect(() => {
    dialogRef.current?.focus();
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Load image to get dimensions
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = image;
  }, [image]);

  // Calculate aspect ratio and determine appropriate sizing
  const getImageWrapperStyle = () => {
    if (!imageDimensions) {
      // Default to square while loading
      return { aspectRatio: "1/1", maxHeight: "60vh" };
    }
    
    const aspectRatio = imageDimensions.width / imageDimensions.height;
    
    if (aspectRatio > 1.3) {
      // Landscape: use wider aspect ratio
      return { aspectRatio: "4/3", maxHeight: "65vh" };
    } else if (aspectRatio < 0.75) {
      // Portrait: use taller aspect ratio
      return { aspectRatio: "3/4", maxHeight: "70vh" };
    } else {
      // Square-ish: use square
      return { aspectRatio: "1/1", maxHeight: "60vh" };
    }
  };

  return (
    <div className={overlay()} onClick={onClose} role="presentation">
      <div
        style={{ 
          transform: `rotate(${[-2, 1, -1.5, 2, -1, 1.5][Math.floor(Math.random() * 6)]}deg)`,
        }}
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
          <X className="w-full h-full" />
        </button>
        <div 
          className={imageWrapper()}
          style={getImageWrapperStyle()}
        >
          <Image
            src={image}
            alt={alt}
            fill
            className={imageClass()}
            sizes="(max-width: 768px) 90vw, 700px"
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

