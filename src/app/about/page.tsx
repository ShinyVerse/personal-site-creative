import { Metadata } from "next";
import { tv } from "tailwind-variants";
import Image from "next/image";

const aboutPageStyles = tv({
  slots: {
    root: "bg-off-black text-white h-full w-full font-handwriting",
    inner: "max-w-6xl mx-auto grid gap-16 justify-center align-center",
    section: "flex flex-col w-full max-w-2xl mx-auto",
    sectionGrid:
      "w-full grid grid-cols-1 lg:grid-cols-2 items-center justify-around gap-8",
    heading: "text-primary font-bold font-lato text-sm py-4 px-4 lg:px-0 ",
    featuredText: "text-3xl font-lato px-4 lg:px-0",
    paragraph: "text-xl py-3 px-4 lg:px-0",
  },
});

export const metadata: Metadata = {
  title: "About me - Laura Jackson",
  description: "Learn more about Laura Jackson, her background and interests",
};

export default function AboutPage() {
  const styles = aboutPageStyles();
  return (
    <main className={styles.root()}>
      <div className={styles.inner()}>
        <section className={styles.section()}>
          <h2 className={styles.heading()}>ME IN A NUT-SHELL</h2>
          <p className={styles.featuredText()}>
            I&apos;m a cat person, relaxed gamer, feeder, gardener, artistic
            developer.
          </p>
        </section>
        {/* Featured Section */}
        <section className={styles.sectionGrid()}>
          <div className="relative aspect-square w-full">
            <Image
              src="/boy-digital.jpeg"
              alt="An illustration of a boy looking at jellyfish"
              fill
              className="rounded-sm object-cover"
            />
          </div>

          <div>
            <p className={styles.paragraph()}>
              Often caught scribbling in a sketchpad, experimenting in
              Procreate, or tinkering with a stubborn traditional piece.
            </p>

            <p className={styles.paragraph()}>
              Forever chasing curious techniques, making brushes of my own, and
              seeing where the inspiration takes me.
            </p>
          </div>
        </section>
        <section className={styles.section()}>
          <h2 className={styles.heading()}>SOMETHING ELSE HERE, IDK</h2>
          <p className={styles.featuredText()}>
            A passionate feeder who explores global cuisines with curiosity and
            glee.
          </p>
        </section>
        <section className={styles.sectionGrid()}>
          <div className="relative aspect-square w-full">
            <Image
              src="/jam-making.jpeg"
              alt="An illustration of a boy looking at jellyfish"
              fill
              className="rounded-sm object-cover"
            />
          </div>
          <div>
            <p className={styles.paragraph()}>
              A passionate feeder who explores global cuisines with curiosity
              and glee. Restaurants spark inspiration, guiding playful
              recreations and original dishes at home.
            </p>

            <p className={styles.paragraph()}>
              From hand-pulled noodles to decorated cakes, what lands on the
              table depends entirely on the weather, what the cupboards hold—and
              the whim.
            </p>
          </div>
        </section>

        {/* Bottom Section */}
        <section className={styles.section()}>
          <h2 className={styles.heading()}>EMPLOYING ME FEEDS THESE MOUTHS</h2>
          <ul className="flex flex-wrap justify-evenly gap-4">
            <li>
              <Image
                src="/katara.png"
                alt="Image of Katara the cat"
                width={150}
                height={150}
                className="max-h-[150px] max-w-[150px] rounded-2xl"
              />
            </li>
            <li>
              <Image
                src="/dusty.png"
                alt="Image of Dusty the duprasi"
                width={150}
                height={150}
                className="max-h-[150px] max-w-[150px] rounded-2xl"
              />
            </li>
            <li>
              <Image
                src="/sokka.png"
                alt="Image of Sokka the cat"
                width={150}
                height={150}
                className="max-h-[150px] max-w-[150px] rounded-2xl"
              />
            </li>
            <li>
              <Image
                src="/greg.png"
                alt="Image of Greg the fish"
                width={150}
                height={100}
                className="max-h-[150px] max-w-[150px] rounded-2xl"
              />
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
