import { CareerEntry } from "@/app/components/CareerPage/CareerEntry";
import { fetchContentfulEntries } from "@/lib/contentfulHelpers";
import { JobEntriesSchema } from "@/lib/jobEntrySchemas";
import { Metadata } from "next";
import { tv } from "tailwind-variants";
import { MainHeader } from "../components/MainHeader";
import { PieChart, TruckIcon, TargetIcon, UserCog, Compass, MessageCircleCode} from "lucide-react";

const careerPageStyles = tv({
  slots: {
    heading:
    "text-[60px] md:text-[100px] font-handwriting text-secondary text-start",
    horizontalSection: "p-5",
    container: "bg-white w-full overflow-hidden max-w-[1600px] mx-auto",
    content: "grid grid-cols-1 lg:grid-cols-2 md:gap-0 px-0 py-16 mx-auto text-left",
  },
});

// Colors array - maintains the order for product entries
const productEntryColors = [
  "text-brand-purple",
  "text-brand-orange",
  "text-brand-pink",
  "text-primary",
  "text-brand-orange",
  "text-brand-purple",
];

const productEntries = [
    {
      icon: MessageCircleCode,
      title: "Technical Bridge",
      description: "I act as a bridge between engineering, product, and design, using my technical background to translate constraints, unblock delivery, and keep teams aligned on what's feasible and valuable.",
    },  
    {
      icon: PieChart,
      title: "Problem framing",
      description: "I turn ambiguous problems into clear opportunities, aligning teams on what to build and why before delivery begins.",
    },
    {
      icon: TargetIcon,
      title: "Product Execution",
      description: "I prioritise backlogs, sequence work, and keep teams focused on outcomes rather than outputs.",
    },
    {
      icon: UserCog,
      title: "Customer Experience",
      description: "I design and own user journeys in close partnership with design, improving flows, usability, and adoption.",
    },
    {
      icon: Compass,
      title: "Cross-Functional Leadership",
      description: "I align product, design, and engineering, improving delivery practices and building shared ownership.",
    },
    {
      icon: TruckIcon,
      title: "Product Delivery",
      description: "I deliver complex product initiatives end-to-end, defining MVPs, managing scope, and making trade-offs to ship under real constraints.",
    },
];

export const metadata: Metadata = {
  title: "Career",
  description: "Learn more about her roles, skills and experiences",
};

export default async function CareerPage() {
  const styles = careerPageStyles();
  const jobsResult = await fetchContentfulEntries("jobEntry", JobEntriesSchema);

  return (
    <main className={styles.container()}>
      <div className={styles.content()}>
        <div className={styles.horizontalSection()}>
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
        <div className={styles.horizontalSection()}>
          <MainHeader
            title="Product"
            size="medium"
            bgColour="bg-brand-pink"
            containerClassName="mx-auto"
          />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {productEntries.map((entry, idx) => {
                const IconComponent = entry.icon;
                const color = productEntryColors[idx % productEntryColors.length];
                return (
                  <div key={entry.title} className="flex flex-col items-start justify-start gap-1">
                    <IconComponent size={45} className={color} />
                    <p className="text-2xl font-bold">{entry.title}</p>
                    <p className="text-lg mb-6">{entry.description}</p>
                  </div>
                );
              })}
            </div>
        </div>
      </div>
    </main>
  );
}
