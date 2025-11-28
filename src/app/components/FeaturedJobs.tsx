"use client";

import { JobEntries } from "@/lib/jobEntrySchemas";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import { tv } from "tailwind-variants";
import { MainHeader } from "./MainHeader";

interface FeaturedJobsProps {
  jobs: JobEntries;
}

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
  hidden: {},
};

const itemVariants = {
  hidden: { x: 1000, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1 },
  },
};

const animatedFeaturedJobsStyles = tv({
  slots: {
    section: "text-white relative mb-10 flex flex-col justify-between ",
    roleWrapper: "z-10 ml-10 my-5",
    roleHeading:
      "text-md md:text-lg font-semibold mb-2 ml-2 flex flex-row text-secondary gap-1 md:gap-2",
    skills: "ml-5",
    white: "text-white font-extrabold",
    blueBarWrapper: "absolute left-2 w-full z-1 top-[-15px]",
    blueBar:
      "min-w-[7000px] h-full rounded-full bg-primary opacity-75 p-10 shadow-[0_0_15px] shadow-primary/80 ",
  },
});

export const FeaturedJobs = ({ jobs }: FeaturedJobsProps) => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px", once: true });

  const styles = animatedFeaturedJobsStyles();
  return (
    <>
      <MainHeader title="WORK EXP" size="medium" bgColour="bg-secondary" />
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {jobs.slice(0, isMobile ? 3 : 4).map((job, idx) => {
          const { title, techAndSkills, companyName } = job.fields;
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={styles.section()}
            >
              <div className={styles.roleWrapper()}>
                <h3 className={styles.roleHeading()}>
                  <p className={styles.white()}>{title} </p>@ {companyName}
                </h3>

                <p className={styles.skills()}>{techAndSkills}</p>
              </div>
              <motion.div
                className={styles.blueBarWrapper()}
                style={{ height: `calc(100% + 30px)` }}
                role="figure"
                aria-hidden="true"
              >
                <div className={styles.blueBar()} />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
};
