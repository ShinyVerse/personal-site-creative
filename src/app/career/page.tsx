import { JobEntriesSchema, JobEntry } from "@/lib/jobEntrySchemas";
import { createClient } from "contentful";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laura Jackson Career",
  description: "Learn more about Laura Jackson's roles, skills and experiences",
};

import React from "react";

type CareerEntryProps = {
  // title: string;
  // description: string;
  // skills: string[];
  job: JobEntry;
  isLast?: boolean;
};

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY as string,
});

const CareerEntry: React.FC<CareerEntryProps> = ({ job, isLast }) => {
  const {
    title,
    summary,
    employmentStart,
    employmentEnd,
    achievements,
    techAndSkills,
  } = job.fields;
  return (
    <div className="relative pl-12">
      {/* Bubble centered over the line */}
      <div className="absolute left-7 top-0 flex justify-center w-12">
        <div className="w-10 h-10 rounded-full bg-primary z-10" />
      </div>

      {/* Line and content */}
      <div
        className={`flex items-start pl-7 ${
          isLast ? "pl-9 " : "border-l-8 border-primary "
        }`}
      >
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p>
            <time dateTime={String(employmentStart)}>
              {new Date(employmentStart)
                .toLocaleDateString()
                .split("/")
                .slice(1)
                .join("/")}
            </time>
            {" → "}
            <time dateTime={String(employmentEnd)}>
              {new Date(employmentEnd)
                .toLocaleDateString()
                .split("/")
                .slice(1)
                .join("/")}
            </time>
          </p>
          <p className="mt-1">{summary}</p>
          <ul>
            {achievements?.map((achievement) => (
              <li
                key={achievement}
                className="mt-1 font-semibold ml-12 list-disc"
              >
                {achievement}
              </li>
            ))}
            {techAndSkills && <p>Tech : {techAndSkills}</p>}
          </ul>
        </div>
      </div>
    </div>
  );
};

type Entry = {
  title: string;
  description: string;
  skills: string[];
};

const entries: Entry[] = [
  {
    title: "Frontend Developer",
    description: "Worked on building responsive UI components.",
    skills: ["React", "TypeScript", "CSS"],
  },
  {
    title: "Backend Engineer",
    description: "Developed REST APIs and database schemas.",
    skills: ["Node.js", "Express", "MongoDB"],
  },
  {
    title: "Fullstack Engineer",
    description: "Did many things.",
    skills: ["Node.js", "Express", "MongoDB"],
  },
];

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
            isLast={idx === entries.length - 1}
          />
        ))}
      </div>
    </main>
  );
}
