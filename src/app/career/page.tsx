import { CareerEntry } from "@/app/components/CareerPage/CareerEntry";
import { fetchContentfulEntries } from "@/lib/contentfulHelpers";
import { JobEntriesSchema } from "@/lib/jobEntrySchemas";
import { Metadata } from "next";
import { tv } from "tailwind-variants";

const careerPageStyles = tv({
  slots: {
    root: "p-5 bg-off-black",
    heading:
      "text-[60px] md:text-[100px] font-handwriting text-secondary text-center",
  },
});

export const metadata: Metadata = {
  title: "Laura Jackson Career",
  description: "Learn more about Laura Jackson's roles, skills and experiences",
};

export default async function CareerPage() {
  const styles = careerPageStyles();
  const jobsResult = await fetchContentfulEntries("jobEntry", JobEntriesSchema);

  return (
    <main>
      <div className={styles.root()}>
        <h1 className={styles.heading()}>Career Timeline:</h1>
        {jobsResult.success ? (
          jobsResult.data.map((job, idx) => (
            <CareerEntry
              key={job.sys.id}
              job={job}
              isLast={idx === jobsResult.data.length - 1}
              isFirst={idx === 0}
            />
          ))
        ) : (
          <div className="text-white text-center p-8">
            <p>Unable to load career information at this time.</p>
            <p className="text-sm text-gray-400 mt-2">{jobsResult.error}</p>
          </div>
        )}
      </div>
    </main>
  );
}
