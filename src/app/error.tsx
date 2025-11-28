"use client";

import { useEffect } from "react";
import { tv } from "tailwind-variants";
import Link from "next/link";

const errorStyles = tv({
  slots: {
    container:
      "flex min-h-screen flex-col items-center justify-center bg-off-black p-8 text-center",
    heading: "text-4xl md:text-6xl font-block text-secondary mb-4",
    message: "text-xl text-white mb-8 max-w-2xl",
    buttonGroup: "flex flex-col sm:flex-row gap-4",
    button:
      "px-6 py-3 rounded-lg font-semibold transition-colors",
    retryButton:
      "bg-primary text-white hover:bg-primary/80",
    homeButton:
      "bg-secondary text-off-black hover:bg-secondary/80",
  },
});

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const styles = errorStyles();

  useEffect(() => {
    // Log error to console for debugging
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className={styles.container()}>
      <h1 className={styles.heading()}>Oops! Something went wrong</h1>
      <p className={styles.message()}>
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      {error.digest && (
        <p className="text-sm text-gray-400 mb-4">Error ID: {error.digest}</p>
      )}
      <div className={styles.buttonGroup()}>
        <button
          onClick={reset}
          className={`${styles.button()} ${styles.retryButton()}`}
        >
          Try again
        </button>
        <Link
          href="/"
          className={`${styles.button()} ${styles.homeButton()}`}
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

