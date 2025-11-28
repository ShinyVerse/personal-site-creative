import Image from "next/image";
import { tv } from "tailwind-variants";
import ModalWrapper from "./ModalWrapper";

const imageModalStyles = tv({
  slots: {
    container:
      "p-2 pb-8 md:pb-2 max-w-[90vw] md:max-w-[700px] w-full",
    closeButton: "top-3 right-3 w-6 h-6 text-white",
    imageWrapper: "relative w-full aspect-[4/3] max-h-[60vh] bg-black overflow-hidden",
    image: "object-contain rounded-t-lg",
    content: "p-4 space-y-2",
    title: "text-lg md:text-2xl font-semibold font-lato",
    description: "text-md md:text-lg text-zinc-600 font-lato",
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
  const {
    container,
    closeButton,
    imageWrapper,
    image: imageClass,
    content,
    title: titleClass,
    description: descriptionClass,
  } = imageModalStyles();

  return (
    <ModalWrapper
      onClose={onClose}
      containerClassName={container()}
      closeButtonClassName={closeButton()}
    >
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
    </ModalWrapper>
  );
}

