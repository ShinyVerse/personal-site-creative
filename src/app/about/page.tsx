import { Metadata } from "next";
import Image from "next/image";
import { tv } from "tailwind-variants";

const aboutPageStyles = tv({
  slots: {
    root: "grid  px-2 sm:px-4 max-w-7xl mx-auto",
    leftSection: "grid gap-8 md:grid-cols-2 items-start",
    leftSectionInner: "flex flex-col md:flex-row gap-4 items-center",
    rightSection:
      "flex flex-col md:flex-row gap-4 items-center mt-0 md:mt-[50px]",
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
      <section className="grid place-items-center text-center gap-4">
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
            src="/strawberry.svg"
            alt="Strawberry"
            width={200}
            height={200}
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
            src="/me.svg"
            alt="An illustration of me"
            width={200}
            height={200}
            className="md:order-last"
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
            src="/me.svg"
            alt="An illustration of me"
            width={200}
            height={200}
            className="md:order-last"
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
        <h2>Mouths I feed:</h2>
        <ul className="flex flex-wrap justify-center gap-4">
          <li>
            <Image
              src="/katara.png"
              alt="Me avatar"
              width={150}
              height={150}
              className="rounded-full"
            />
          </li>
          <li>
            <Image
              src="/dusty.png"
              alt="Me avatar"
              width={150}
              height={150}
              className="rounded-full"
            />
          </li>
          <li>
            <Image
              src="/sokka.png"
              alt="Me avatar"
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
