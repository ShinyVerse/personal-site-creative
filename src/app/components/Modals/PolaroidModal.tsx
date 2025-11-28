import { useEffect, useState } from "react";
import Image from "next/image";
import { tv } from "tailwind-variants";
import ModalWrapper from "./ModalWrapper";

const polaroidModalStyles = tv({
  slots: {
    container:
      "p-6 pb-8 md:pb-10 max-w-[90vw] md:max-w-[700px] transform",
    closeButton: "top-4 right-4",
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
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const {
    container,
    closeButton,
    imageWrapper,
    image: imageClass,
    content,
    title: titleClass,
    description: descriptionClass,
  } = polaroidModalStyles();

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
    <ModalWrapper
      onClose={onClose}
      containerClassName={container()}
      closeButtonClassName={closeButton()}
      containerStyle={{
        transform: `rotate(${[-2, 1, -1.5, 2, -1, 1.5][Math.floor(Math.random() * 6)]}deg)`,
      }}
    >
      <div className={imageWrapper()} style={getImageWrapperStyle()}>
        <Image
          src={image}
          alt={alt}
          fill
          className={imageClass()}
          loading="lazy"
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
    </ModalWrapper>
  );
}

