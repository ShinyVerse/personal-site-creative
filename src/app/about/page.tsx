import { Metadata } from "next";
import Image from "next/image";
import { tv } from "tailwind-variants";

const aboutPageStyles = tv({
  slots: {
    root: "grid px-2 sm:px-4 max-w-8xl mx-auto",
    leftSection: "grid gap-8 lg:grid-cols-2 items-start",
    leftSectionInner: "flex flex-col lg:flex-row gap-4 items-center",
    rightSection:
      "flex flex-col lg:flex-row gap-4 items-center mt-0 lg:mt-[80px]",
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
      {/* Top Section */}
      <section className="grid place-items-center text-center gap-2">
        <Image
          src="/pixMe.svg"
          alt="An illustration of me"
          width={300}
          height={300}
        />
        <h2>Hiya! I&apos;m Laura</h2>
        <p>
          Duis mi odio, cursus ac varius iaculis, interdum eget nunc. Nullam
          feugiat posuere aliquam. Nulla porttitor tellus sit amet maximus
          posuere. Aliquam malesuada a velit ut egestas.
        </p>
      </section>

      {/* Middle Section */}
      <section className={styles.leftSection()}>
        <div className={styles.leftSectionInner()}>
          <Image
            src="/arty.svg"
            alt="An illustration of a girl painting"
            width={300}
            height={300}
          />
          <div>
            <h3>Art and visual pursuits</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci
              varius natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus.
            </p>
          </div>
        </div>

        <div className={styles.rightSection()}>
          <Image
            src="/coding.svg"
            alt="An illustration of a girl coding"
            width={250}
            height={250}
            className="lg:order-last"
          />
          <div>
            <h3>Technical exploration</h3>
            <p>
              Duis mi odio, cursus ac varius iaculis, interdum eget nunc. Nullam
              feugiat posuere aliquam. Nulla porttitor tellus sit amet maximus
              posuere. Aliquam malesuada a velit ut egestas.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.leftSection()}>
        <div className={styles.leftSectionInner()}>
          <Image
            src="/strawberry.svg"
            alt="Strawberry"
            width={200}
            height={200}
          />
          <div>
            <h3>Gardening and growing</h3>
            <p>
              Natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus. Ut mattis arcu ornare eros semper sodales. Mauris
              cursus ante ut diam elementum tincidunt.
            </p>
          </div>
        </div>

        <div className={styles.rightSection()}>
          <Image
            src="/cooking.svg"
            alt="An illustration of a girl cooking"
            width={300}
            height={300}
            className="lg:order-last"
          />
          <div>
            <h3>Cooking</h3>
            <p>
              Ut mattis arcu ornare eros semper sodales. Mauris cursus ante ut
              diam elementum tincidunt. Nam dictum tortor cursus sem
              consectetur, sed lacinia ligula ultricies. Nunc rhoncus ultrices
              sodales.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="grid place-items-center text-center gap-4">
        <h2>Employing me feeds these mouths:</h2>
        <ul className="flex flex-wrap justify-center gap-4">
          <li>
            <Image
              src="/katara.png"
              alt="Image of Katara the cat"
              width={150}
              height={150}
              className="rounded-full"
            />
          </li>
          <li>
            <Image
              src="/dusty.png"
              alt="Image of Dusty the duprasi"
              width={150}
              height={150}
              className="rounded-full"
            />
          </li>
          <li>
            <Image
              src="/sokka.png"
              alt="Image of Sokka the cat"
              width={150}
              height={150}
              className="rounded-full"
            />
          </li>
          <li>
            <Image
              src="/greg.png"
              alt="Image of Greg the fish"
              width={150}
              height={150}
              className="rounded-full"
            />
          </li>
        </ul>
      </section>
    </main>
  );
}
