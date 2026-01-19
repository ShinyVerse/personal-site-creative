import { Metadata } from "next";
import { tv } from "tailwind-variants";
import Image from "next/image";
import PageSection from "../components/PageSection";

const aboutPageStyles = tv({
  slots: {
    root: "bg-off-black text-white h-full w-full font-handwriting overflow-y-auto",
    inner: "mx-auto grid gap-16 justify-center align-center pb-6",
    heading: "text-primary font-bold font-normal text-sm py-4 px-4 lg:px-0 ",
    featuredText: "text-3xl font-normal px-4 lg:px-0",
    paragraph: "text-xl py-3 px-4 lg:px-0",
  },
});

const PET_IMAGE_SET = [
  { src: "/katara.png", alt: "Image of Katara the cat" },
  { src: "/dusty.png", alt: "Image of Dusty the duprasi" },
  { src: "/sokka.png", alt: "Image of Sokka the cat" },
  { src: "/greg.png", alt: "Image of Greg the fish" },
];
const FOOD_IMAGE_SET = [
  { src: "/food/cake-2.jpg", alt: "Image of a Mario themed cake" },
  { src: "/food/jam-making.jpeg", alt: "Image of jam making" },
  { src: "/food/noodles.png", alt: "Image of handpulled noodles" },
  { src: "/food/cake-1.jpg", alt: "Image of a Life of Pi themed cake" },
];

export const metadata: Metadata = {
  title: "About me - Laura Jackson",
  description: "Learn more about Laura Jackson, her background and interests",
};

export default function AboutPage() {
  const styles = aboutPageStyles();
  return (
    <main className={styles.root()}>
      <div className={styles.inner()}>

        <PageSection>
          <h2 className={styles.heading()}>ME IN A NUT-SHELL</h2>
          <p className={styles.featuredText()}>
            I&apos;m a cat person, relaxed gamer, feeder, gardener, artistic
            developer.
          </p>
        </PageSection>
        {/* Featured Section */}
        <PageSection variant="grid">
          <div className="relative aspect-square w-full max-w-3xl mx-auto">
            <Image
              src="/boy-digital.jpeg"
              alt="An illustration of a boy looking at jellyfish"
              fill
              className="rounded-sm object-cover"
              priority
            />
          </div>

          <div>
            <p className={styles.paragraph()}>
              Often caught scribbling in a sketchpad, experimenting in
              Procreate, or tinkering with a stubborn traditional piece.
            </p>

            <p className={styles.paragraph()}>
              Forever chasing curious techniques, making digital brushes of my
              own, and seeing where the inspiration takes me.
            </p>
          </div>
        </PageSection>
        <PageSection>
          <h2 className={styles.heading()}>WHAT&apos;S COOKING?</h2>
          <p className={styles.featuredText()}>
            From hand-pulled noodles to decorated cakes, what lands on the table
            depends entirely on the weather, what the cupboards hold, what I can
            fetch from the garden and, of course the whim of the day.
          </p>
        </PageSection>
        <PageSection>
          <ul className="flex flex-wrap justify-center gap-1">
            {FOOD_IMAGE_SET.map((image) => (
              <li key={image.alt}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={300}
                  className="rounded-lg"
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 300px"
                />
              </li>
            ))}
          </ul>
        </PageSection>
        <PageSection>
          <h2 className={styles.heading()}>SOWING AND GROWING</h2>
          <p className={styles.featuredText()}>
            Spending time growing food for the table and flowers for the soul.
            Organically keeping pests at bay by making use of lure and companion
            plants.
          </p>
        </PageSection>
        <PageSection variant="grid">
          <div className="relative aspect-square w-full">
            <Image
              src="/garden.jpg"
              alt="A image of plants in a greenhouse"
              fill
              className="rounded-sm object-cover"
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="relative aspect-square w-full">
            <Image
              src="/grapes.jpeg"
              alt="A image of plants in a greenhouse"
              fill
              className="rounded-sm object-cover"
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </PageSection>

        {/* Bottom Section */}
        <PageSection>
          <h2 className={styles.heading()}>EMPLOYING ME FEEDS THESE MOUTHS</h2>
          <ul className="flex flex-wrap justify-evenly gap-4">
            {PET_IMAGE_SET.map((image) => (
              <li key={image.alt}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={150}
                  height={150}
                  className="max-h-[150px] max-w-[150px] rounded-2xl"
                  loading="lazy"
                  sizes="150px"
                />
              </li>
            ))}
          </ul>
        </PageSection>
      </div>
    </main>
  );
}
