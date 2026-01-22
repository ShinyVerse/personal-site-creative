import { Metadata } from "next";
import { tv } from "tailwind-variants";
import PageSection from "../components/PageSection";

const privacyPageStyles = tv({
  slots: {
    root: "text-off-black h-full w-full font-handwriting overflow-y-auto",
    inner: "mx-auto grid gap-16 justify-center align-center pb-6",
    heading: "text-primary font-bold font-normal text-sm py-4 px-4 lg:px-0",
    paragraph: "text-xl py-3 px-4 lg:px-0",
    list: "text-xl py-2 px-4 lg:px-0 list-disc list-inside",
  },
});

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Laura Jackson's personal site",
};

export default function PrivacyPage() {
  const styles = privacyPageStyles();
  return (
    <main className={styles.root()}>
      <div className={styles.inner()}>
        <PageSection>
          <h1 className={styles.heading()}>PRIVACY POLICY</h1>
          <p className={styles.paragraph()}>
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </PageSection>

        <PageSection>
          <h2 className={styles.heading()}>INTRODUCTION</h2>
          <p className={styles.paragraph()}>
            This is a personal hobby website. I respect your privacy and am committed to being transparent about any data collection.
          </p>
        </PageSection>

        <PageSection>
          <h2 className={styles.heading()}>ANALYTICS</h2>
          <p className={styles.paragraph()}>
            This website uses Google Analytics to help me understand how visitors interact with the site. This is a learning tool for me to see basic usage statistics.
          </p>
          <p className={styles.paragraph()}>
            Google Analytics collects information such as:
          </p>
          <ul className={styles.list()}>
            <li>Pages visited and time spent on pages</li>
            <li>How you arrived at the site (referring website, search engine, etc.)</li>
            <li>General location information (country/city level)</li>
            <li>Device and browser information</li>
          </ul>
          <p className={styles.paragraph()}>
            To protect your privacy, IP addresses are anonymized before being sent to Google Analytics. This means the last portion of your IP address is masked, while still allowing for accurate location data at the country and city level.
          </p>
          <p className={styles.paragraph()}>
            This data is processed by Google according to their privacy policy. I use this data solely for personal learning and to understand site usage patterns. I do not share this data with third parties.
          </p>
          <p className={styles.paragraph()}>
            You can opt out of Google Analytics tracking by installing the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary/80"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>
        </PageSection>

        <PageSection>
          <h2 className={styles.heading()}>COOKIES</h2>
          <p className={styles.paragraph()}>
            Google Analytics uses cookies to collect the information described above. These cookies are set by Google and are subject to Google&apos;s privacy policy.
          </p>
        </PageSection>

        <PageSection>
          <h2 className={styles.heading()}>QUESTIONS</h2>
          <p className={styles.paragraph()}>
            If you have any questions about this privacy policy or how your data is handled, contact information will be available on this site once it&apos;s set up.
          </p>
        </PageSection>
      </div>
    </main>
  );
}
