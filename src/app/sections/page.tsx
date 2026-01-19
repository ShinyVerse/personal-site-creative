"use client";

import { tv } from "tailwind-variants";

const sectionsPageStyles = tv({
  slots: {
    container: "w-full overflow-x-hidden",
    section: "h-screen w-full flex items-center justify-center px-4 md:px-8 lg:px-16",
    sectionOne: "bg-brand-pink",
    sectionTwo: "bg-brand-purple",
    sectionThree: "bg-brand-orange",
    content: "text-white text-center max-w-4xl mx-auto",
    title: "text-4xl md:text-5xl lg:text-6xl font-bold mb-4",
    description: "text-lg md:text-xl lg:text-2xl",
  },
});

export default function SectionsPage() {
  const styles = sectionsPageStyles();

  return (
    <main className={styles.container()}>
      {/* Section 1 */}
      <section className={`${styles.section()} ${styles.sectionOne()}`}>
        <div className={styles.content()}>
          <h1 className={styles.title()}>Section One</h1>
          <p className={styles.description()}>
            This is the first section with a pink background
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section className={`${styles.section()} ${styles.sectionTwo()}`}>
        <div className={styles.content()}>
          <h1 className={styles.title()}>Section Two</h1>
          <p className={styles.description()}>
            This is the second section with a purple background
          </p>
        </div>
      </section>

      {/* Section 3 */}
      <section className={`${styles.section()} ${styles.sectionThree()}`}>
        <div className={styles.content()}>
          <h1 className={styles.title()}>Section Three</h1>
          <p className={styles.description()}>
            This is the third section with an orange background
          </p>
        </div>
      </section>
    </main>
  );
}
