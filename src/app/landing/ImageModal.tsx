import Image from "next/image";
import { tv } from "tailwind-variants";
import Modal from "@/app/components/Modal";

const imageModalStyles = tv({
  slots: {
    container: "pb-2 m-3 w-[90%] max-w-[1000px]",
    closeButton: "top-3 right-3 w-6 h-6 text-white",
    imageWrapper: "relative w-auto h-auto aspect-[4/3] sm:h-1/2 bg-black",
    image: "object-contain rounded-t-lg",
    content: "p-6 space-y-2",
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
    <Modal
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
    </Modal>
  );
}
