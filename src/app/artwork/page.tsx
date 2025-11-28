import { Metadata } from "next";

import { PhotoEntriesSchema } from "@/lib/photoSchemas";
import Carousel from "@/app/components/ArtworkCarousel";
import { fetchContentfulEntries } from "@/lib/contentfulHelpers";
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
  const photosResult = await fetchContentfulEntries("photo", PhotoEntriesSchema);

  return (
    <main className={styles.root()}>
      <section className={styles.section()}>
        {photosResult.success ? (
          <Carousel photos={photosResult.data} />
        ) : (
          <div className="text-white text-center p-8">
            <p>Unable to load artwork at this time.</p>
            <p className="text-sm text-gray-400 mt-2">{photosResult.error}</p>
          </div>
        )}
      </section>
    </main>
  );
}
