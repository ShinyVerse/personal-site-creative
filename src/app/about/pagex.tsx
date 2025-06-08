import { Metadata } from "next";
import { tv } from "tailwind-variants";
import Image from "next/image";
import Link from "next/link";

const aboutPageStyles = tv({
  slots: {
    root: "grid px-2 sm:px-4 max-w-8xl mx-auto",
    leftSection: "grid gap-8 lg:grid-cols-1 items-start",
    leftSectionInner: "flex flex-col lg:flex-row gap-2 items-center",
    rightSection:
      "flex flex-col lg:flex-row gap-4 items-center mt-0 lg:mt-[60px]",
    section: "flex flex-col gap-2 items-start",
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
      {/* <section className="grid place-items-center text-center gap-2">
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
      </section> */}

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
            <h3>Paint, Pixels & Possibilities</h3>
            <p>
              Often caught scribbling in a sketchpad, experimenting in
              Procreate, or tinkering with a stubborn traditional piece.
              I&apos;m on a gentle quest to find my style, currently working on
              a deeper understanding of faces and expressions. Forever chasing
              curious techniques, making brushes of my own, and seeing where the
              inspiration takes me. Some works evolve beyond expectation; others
              find completion earlier than imagined.
            </p>
            <p>
              Checkout my recent pieces <Link href="/artwork">here</Link>
            </p>

            <Link
              rel="noopener noreferrer nofollow"
              target="_blank"
              href="https://www.instagram.com/supershinyverse/"
              className="flex flex-row flex-nowrap"
            >
              Or my instagram
              <Image
                className="ml-1"
                src="/instagram.svg"
                alt="Instagram icon"
                width={20}
                height={20}
              />
            </Link>
          </div>
        </div>

        <div className={styles.rightSection()}>
          <Image
            src="/coding.svg"
            alt="An illustration of a girl coding"
            width={250}
            height={250}
          />
          <div>
            <h3>From Sims to Syntax</h3>
            <p>
              I didn&apos;t start out as a developer and had little interaction
              with computers early on—except for games. Most of my career has
              been focused on React Native, a dash of Backend, and recently
              I&apos;ve been enjoying the new challenges that Next.js brings. I
              see myself as a product developer who cares deeply about the
              people using what I build. I&apos;m driven by creating thoughtful,
              user-friendly solutions that make a real difference, blending
              creativity with practical problem-solving.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.leftSection()}>
        <div className={styles.leftSectionInner()}>
          <Image
            src="/gardening.svg"
            alt="An illustration of a girl gardening"
            width={280}
            height={280}
            className="lg:order-last"
          />
          <div className="mr-[-60px]">
            <h3>Sowing and growing</h3>
            <p>
              Tending my garden with care, growing food for the table and
              flowers for the soul. Organically keeping pests at bay by making
              use of lure and companion plants. Some of my favorites to grow are
              potatoes, beans, corn, snapdragons, and sage.
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
            <h3>A Butter-Spattered Feeder</h3>
            <p>
              A passionate feeder who explores global cuisines with curiosity
              and glee. Restaurants spark inspiration, guiding playful
              recreations and original dishes at home. From hand-pulled noodles
              to decorated cakes, what lands on the table depends entirely on
              the weather, what the cupboards hold—and the whim.
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
