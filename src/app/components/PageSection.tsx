import { tv, type VariantProps } from "tailwind-variants";
import { ReactNode } from "react";

const pageSectionStyles = tv({
  base: "w-full",
  variants: {
    variant: {
      default: "flex flex-col max-w-2xl mx-auto",
      grid: "grid grid-cols-1 lg:grid-cols-2 items-center gap-2",
    },
    fullHeight: {
      true: "h-full",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    fullHeight: false,
  },
});

export type PageSectionProps = VariantProps<typeof pageSectionStyles> & {
  children: ReactNode;
  className?: string;
};

export default function PageSection({
  children,
  variant,
  fullHeight,
  className,
}: PageSectionProps) {
  const styles = pageSectionStyles({ variant, fullHeight });

  return <section className={`${styles} ${className || ""}`}>{children}</section>;
}
