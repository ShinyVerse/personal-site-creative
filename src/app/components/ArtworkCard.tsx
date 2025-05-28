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
    <div className="bg-red-500">
      <Image
        // className="dark:invert"
        src={imageSrc}
        alt={altText}
        // width={photo.fields.thumbnail.fields.file.details.image.width}
        // height={photo.fields.thumbnail.fields.file.details.image.height}
        width={300}
        height={300}
        priority
      />
      <h3 style={{ marginTop: 12 }}>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
