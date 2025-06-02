import { Metadata } from "next";

import { PhotoEntriesSchema } from "@/lib/photoSchemas";
import { Carousel } from "@/app/components/ArtworkCarousel";
import { client } from "@/lib/contentfulClient";
import { tv } from "tailwind-variants";

const artworkPageStyles = tv({
  slots: {
    root: "flex items-center flex-col",
    section: "w-full h-1/2",
  },
});

export const metadata: Metadata = {
  title: "Laura Jackson Recent Artwork",
  description:
    "Showcases the top most recent art pieces and gives some insight into my process.",
};

export default async function ArtworkPage() {
  const styles = artworkPageStyles();
  const res = await client.getEntries({
    content_type: "photo",
  });
  const photos = res.items;

  const parsedPhotos = PhotoEntriesSchema.safeParse(photos);

  return (
    <main className={styles.root()}>
      {/* <h2>Recent Artwork</h1> */}
      <section className={styles.section()}>
        {parsedPhotos.data && <Carousel photos={parsedPhotos.data}></Carousel>}
      </section>
    </main>
  );
}
