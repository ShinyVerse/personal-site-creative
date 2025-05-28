import { Metadata } from "next";
import { createClient } from "contentful";
import ArtworkCard from "../components/ArtworkCard";
import { PhotoEntrySchema } from "@/lib/photoSchemas";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY as string,
});

export const metadata: Metadata = {
  title: "Laura Jackson Recent Artwork",
  description:
    "Showcases the top most recent art pieces and gives some insight into my process.",
};

export default async function ArtworkPage() {
  const res = await client.getEntries({
    content_type: "photo",
  });
  const photos = res.items;
  console.log(photos[0].fields);

  console.log(JSON.stringify(photos[0], null, 2));

  return (
    <main>
      <h1>Recent Artwork</h1>
      <p>Here are up to 5 of my latest pieces.</p>
      {photos.map((photo) => {
        const parsedPhoto = PhotoEntrySchema.safeParse(photo);
        if (!parsedPhoto.success) {
          console.log("Validation error:", parsedPhoto.error.format());

          return null;
        }
        const validPhoto = parsedPhoto.data;

        return (
          <div key={validPhoto.sys.id}>
            <ArtworkCard
              title={validPhoto.fields.title}
              description={
                validPhoto.fields.description.content[0].content[0].value ||
                "No description"
              }
              imageSrc={"https:" + validPhoto.fields.image.fields.file.url}
              altText={validPhoto.fields.altText}
            />
          </div>
        );
      })}
    </main>
  );
}
