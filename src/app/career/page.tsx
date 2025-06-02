import { CareerEntry } from "@/app/components/CareerPage/CareerEntry";
import { client } from "@/lib/contentfulClient";
import { JobEntriesSchema } from "@/lib/jobEntrySchemas";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laura Jackson Career",
  description: "Learn more about Laura Jackson's roles, skills and experiences",
};

export default async function CareerPage() {
  const res = await client.getEntries({
    content_type: "jobEntry",
  });
  const jobs = res.items;

  const parsedJobs = JobEntriesSchema.safeParse(jobs);

  return (
    <main>
      <h1>Career Portfolio</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
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
