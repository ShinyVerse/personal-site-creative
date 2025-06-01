import { Metadata } from "next";
import { createClient } from "contentful";
import { PhotoEntriesSchema } from "@/lib/photoSchemas";
import { Carousel } from "../components/ArtworkCarousel";

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

  const parsedPhotos = PhotoEntriesSchema.safeParse(photos);

  return (
    <main className="flex items-center flex-col">
      <h1>Recent Artwork</h1>
      <p>Here are up to 5 of my latest pieces.</p>
      <section className="w-full h-1/2">
        {parsedPhotos.data && <Carousel photos={parsedPhotos.data}></Carousel>}
      </section>
    </main>
  );
}
