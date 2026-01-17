import { CareerEntry } from "@/app/components/CareerPage/CareerEntry";
import { fetchContentfulEntries } from "@/lib/contentfulHelpers";
import { JobEntriesSchema } from "@/lib/jobEntrySchemas";
import { Metadata } from "next";
import { tv } from "tailwind-variants";
import { MainHeader } from "../components/MainHeader";

const careerPageStyles = tv({
  slots: {
    pad: "p-5",
    heading:
      "text-[60px] md:text-[100px] font-handwriting text-secondary text-start",
      container: "bg-white w-full overflow-hidden max-w-[1800px] mx-auto",
      content: "grid grid-cols-1 lg:grid-cols-2  md:gap-0 px-0 py-16 mx-auto text-left ",
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
    <main className={styles.container()}>
      <div className={styles.content()}>
        <div className={styles.pad()}>
          <MainHeader
            title="Tech"
            size="medium"
            bgColour="bg-brand-orange" 
            containerClassName="mx-auto"
          />
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
            <div className="text-off-black text-center p-8">
              <p>Unable to load career information at this time.</p>
              <p className="text-sm text-gray-400 mt-2">{jobsResult.error}</p>
            </div>
          )}
        </div>
        <div className={styles.pad()}>
          <MainHeader
            title="Product"
            size="medium"
            bgColour="bg-brand-pink" 
            containerClassName="mx-auto"
          />
             <CareerEntry
                key="product-1"
                job={   {
                  sys: {
                      id: "product-1",
                  },
                  fields: {
                      title: "product engineering",
                      companyName: "Checkatrade",
                      summary: "Helped with product engineering and development",
                      employmentStart: Date.now().toString(),
                      employmentEnd: "present",
                      achievements: ["Achievement 1", "Achievement 2", "Achievement 3"],

                  }
              }}

              />
        </div>
      </div>
    </main>
  );
}
