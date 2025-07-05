import { JobEntry } from "@/lib/jobEntrySchemas";
import { tv } from "tailwind-variants";

type CareerEntryProps = {
  job: JobEntry;
  isLast?: boolean;
  isFirst?: boolean;
};

const careerEntryStyles = tv({
  slots: {
    root: "relative pl-7 text-white",
    bubbleWrapper:
      "absolute left-5 md:left-2 top-0 flex justify-center w-6 md:w-12",
    bubble: "w-6 h-6 md:w-10 md:h-10 rounded-full bg-primary z-10",
    pinkBubble: "bg-secondary",
    contentWrapperBase: "flex items-start pl-7 md:pl-10",
    contentWrapperLast: "pl-9",
    contentWrapperBorder: "border-l-8 md:border-l-8 border-primary",
    contentWrapperBorderFirst:
      "relative pl-7 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-2 before:bg-gradient-to-t before:from-primary before:to-secondary before:content-['']",
    title: "text-lg font-semibold mb-2",
    summary: "mt-1 my-2",
    achievementList: "mb-5",
    achievement: "mt-1 font-semibold ml-12 list-disc",
    techAndSkills: "my-5",
  },
});

export const CareerEntry: React.FC<CareerEntryProps> = ({
  job,
  isLast,
  isFirst,
}) => {
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
        <div
          className={
            isFirst
              ? `${styles.bubble()} ${styles.pinkBubble()}`
              : styles.bubble()
          }
        />
      </figure>

      {/* Line and content */}
      <div
        className={`${styles.contentWrapperBase()} ${
          isLast
            ? styles.contentWrapperLast()
            : isFirst
              ? styles.contentWrapperBorderFirst()
              : styles.contentWrapperBorder()
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
          <ul className={styles.achievementList()}>
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
