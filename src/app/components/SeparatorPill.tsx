import { tv } from "tailwind-variants";

const separatorPillStyles = tv({
  base: "rounded-full mx-auto my-2",
  variants: {
    size: {
      small: "w-12 h-2",
      medium: "w-16 h-3 md:w-20 md:h-4",
      large: "w-24 h-4 md:w-32 md:h-5",
    },
    color: {
      purple: "bg-brand-purple",
      pink: "bg-brand-pink",
      orange: "bg-brand-orange",
      yellow: "bg-brand-yellow",
    },
  },
  defaultVariants: {
    size: "medium",
    color: "purple",
  },
});

interface SeparatorPillProps {
  color?: "purple" | "pink" | "orange" | "yellow";
  size?: "small" | "medium" | "large";
  className?: string;
}

export default function SeparatorPill({
  color,
  size,
  className = "",
}: SeparatorPillProps) {
  const styles = separatorPillStyles({ color, size });
  return <div className={`${styles} ${className}`} />;
}
