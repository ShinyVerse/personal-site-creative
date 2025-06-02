import { CareerEntry } from "@/app/components/CareerPage/CareerEntry";
import { client } from "@/lib/contentfulClient";
import { JobEntriesSchema } from "@/lib/jobEntrySchemas";
import { Metadata } from "next";
import { tv } from "tailwind-variants";

const careerPageStyles = tv({
  slots: {
    root: "flex flex-col",
  },
});

export const metadata: Metadata = {
  title: "Laura Jackson Career",
  description: "Learn more about Laura Jackson's roles, skills and experiences",
};

export default async function CareerPage() {
  const styles = careerPageStyles();
  const res = await client.getEntries({
    content_type: "jobEntry",
  });
  const jobs = res.items;

  const parsedJobs = JobEntriesSchema.safeParse(jobs);

  return (
    <main>
      <h1>Career Portfolio</h1>
      <div className={styles.root()}>
        {parsedJobs?.data?.map((job, idx) => (
          <CareerEntry
            key={idx}
            job={job}
            isLast={idx === parsedJobs.data.length - 1}
          />
        ))}
      </div>
    </main>
  );
}
