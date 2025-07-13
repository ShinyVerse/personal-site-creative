"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { tv } from "tailwind-variants";

const JazzyLinkStyles = tv({
  slots: {
    cta: "border-2 border-secondary font-bold text-white bg-off-black rounded-2xl flex flex-row justify-center items-center gap-2  py-3 hover:text-secondary active:bg-primary active:border-primary active:text-black w-full mx-5 max-w-[300px] xl:mb-20",
  },
});

interface JazzyLinkProps {
  title: string;
  href: string;
  icon?: ReactNode;
  rel?: boolean;
  target?: boolean;
  isAnchor?: boolean;
}

export const JazzyLink = ({
  title,
  href,
  icon: Icon,
  rel = false,
  target = false,
  isAnchor = false,
}: JazzyLinkProps) => {
  const styles = JazzyLinkStyles();

  const handleAnchorClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return isAnchor ? (
    <a
      href={href}
      onClick={handleAnchorClick}
      className={`${styles.cta()} scroll-smooth`}
    >
      {title} {Icon && Icon}
    </a>
  ) : (
    <Link
      href={href}
      className={styles.cta()}
      rel={rel ? "noopener noreferrer nofollow" : undefined}
      target={target ? "_blank" : undefined}
    >
      {title} {Icon && Icon}
    </Link>
  );
};
