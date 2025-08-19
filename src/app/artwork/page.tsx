import { Metadata } from "next";

import { PhotoEntriesSchema } from "@/lib/photoSchemas";
import { Carousel } from "@/app/components/ArtworkCarousel";
import { client } from "@/lib/contentfulClient";
import { tv } from "tailwind-variants";
import GalleryCarousel from "../components/Artwork/GalleryCarousel";

const artworkPageStyles = tv({
  slots: {
    root: "flex items-center flex-col",
    // section: "w-full h-1/2",
  },
});

export const metadata: Metadata = {
  title: "Laura Jackson Recent Artwork",
  description:
    "Showcases the top most recent art pieces and gives some insight into my process.",
};

export default async function ArtworkPage() {
  const styles = artworkPageStyles();
  const pageSize = 5;

  const res = await client.getEntries({
    content_type: "photo",
    limit: pageSize,
  });
  const photos = res.items;

  const parsedPhotos = PhotoEntriesSchema.safeParse(photos);

  return (
    <main>
      <div className={styles.root()}>
        {/* <section className={styles.section()}> */}
        {/* {parsedPhotos.data && <Carousel photos={parsedPhotos.data}></Carousel>} */}
        <GalleryCarousel photos={parsedPhotos.data || []} total={res.total} />
        {/* </section> */}
      </div>
    </main>
  );
}
