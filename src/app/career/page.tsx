import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laura Jackson Career",
  description: "Learn more about Laura Jackson's roles, skills and experiences",
};

import React from "react";

type CareerEntryProps = {
  title: string;
  description: string;
  skills: string[];
  isLast?: boolean;
};

const CareerEntry: React.FC<CareerEntryProps> = ({
  title,
  description,
  skills,
  isLast,
}) => {
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
          <p className="mt-1">{description}</p>
          <p className="mt-1 font-semibold pb-5">
            Skills: <span className="font-normal">{skills.join(", ")}</span>
          </p>
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

export default function CareerPage() {
  return (
    <main>
      <h1>Career Portfolio</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {entries.map((entry, idx) => (
          <CareerEntry
            key={idx}
            {...entry}
            isLast={idx === entries.length - 1}
          />
        ))}
      </div>
    </main>
  );
}
