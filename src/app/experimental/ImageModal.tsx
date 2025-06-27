import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import Image from "next/image";

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

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative bg-white pb-2 m-3 w-[90%] max-w-[1000px] rounded-lg outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-6 h-6 text-white z-51"
          aria-label="Close modal"
        >
          <X />
        </button>
        <div className="relative w-full h-auto aspect-[4/3] sm:h-1/2">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 640px) 100vw, 100%"
          />
        </div>
        <div className="p-6 space-y-2">
          <h2 id="modal-title" className="text-lg font-semibold">
            {title}
          </h2>
          <p className="text-sm text-zinc-600">{description}</p>
        </div>
      </div>
    </div>
  );
}
