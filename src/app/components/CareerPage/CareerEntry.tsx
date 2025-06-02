import { JobEntry } from "@/lib/jobEntrySchemas";
import { tv } from "tailwind-variants";

type CareerEntryProps = {
  job: JobEntry;
  isLast?: boolean;
};

const careerEntryStyles = tv({
  slots: {
    root: "relative pl-12",
    bubbleWrapper: "absolute left-7 top-0 flex justify-center w-12",
    bubble: "w-10 h-10 rounded-full bg-primary z-10",
    contentWrapperBase: "flex items-start pl-7",
    contentWrapperLast: "pl-9",
    contentWrapperBorder: "border-l-8 border-primary",
    title: "text-lg font-semibold",
    summary: "mt-1",
    achievement: "mt-1 font-semibold ml-12 list-disc",
    techAndSkills: "",
  },
});

export const CareerEntry: React.FC<CareerEntryProps> = ({ job, isLast }) => {
  const styles = careerEntryStyles();

  const {
    title,
    summary,
    employmentStart,
    employmentEnd,
    achievements,
    techAndSkills,
  } = job.fields;

  return (
    <article className={styles.root()} aria-label={`Career entry: ${title}`}>
      {/* Bubble centered over the line */}
      <figure className={styles.bubbleWrapper()} aria-hidden="true">
        <div className={styles.bubble()} />
      </figure>

      {/* Line and content */}
      <div
        className={`${styles.contentWrapperBase()} ${
          isLast ? styles.contentWrapperLast() : styles.contentWrapperBorder()
        }`}
      >
        <div>
          <h3 className={styles.title()}>{title}</h3>
          <div aria-label="Employment period">
            <time dateTime={String(employmentStart)}>
              {new Date(employmentStart)
                .toLocaleDateString()
                .split("/")
                .slice(1)
                .join("/")}
            </time>
            {" → "}
            <time
              dateTime={
                employmentEnd === "Present"
                  ? String(Date.now())
                  : String(employmentEnd)
              }
            >
              {employmentEnd === "Present"
                ? "Present"
                : new Date(employmentEnd)
                    .toLocaleDateString()
                    .split("/")
                    .slice(1)
                    .join("/")}
            </time>
          </div>
          <p className={styles.summary()}>{summary}</p>
          <ul>
            {achievements?.map((achievement) => (
              <li key={achievement} className={styles.achievement()}>
                {achievement}
              </li>
            ))}
          </ul>
          {techAndSkills && (
            <p className={styles.techAndSkills()}>Tech : {techAndSkills}</p>
          )}
        </div>
      </div>
    </article>
  );
};
