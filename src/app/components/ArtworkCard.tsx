import Image from "next/image";

type ArtworkCardProps = {
  title: string;
  description?: string;
  imageSrc: string;
  altText?: string;
};

export default function ArtworkCard({
  title,
  imageSrc,
  description,
  altText = "Artwork image",
}: ArtworkCardProps) {
  return (
    <article className="border border-gray-300 rounded-lg p-4 flex flex-col items-center bg-white ">
      <Image
        src={imageSrc}
        alt={altText}
        // width={photo.fields.thumbnail.fields.file.details.image.width}
        // height={photo.fields.thumbnail.fields.file.details.image.height}
        width={300}
        height={300}
        priority
      />
      <h3 className="mt-2">{title}</h3>
      <p>{description}</p>
    </article>
  );
}
