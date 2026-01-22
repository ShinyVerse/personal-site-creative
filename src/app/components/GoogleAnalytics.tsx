"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

// Type-safe gtag function
type GtagCommand = "config" | "set" | "event" | "js";
type GtagConfigParams = {
  page_path?: string;
  page_title?: string;
  anonymize_ip?: boolean;
  [key: string]: unknown;
};

declare global {
  interface Window {
    gtag?: (
      command: GtagCommand,
      targetId: string | Date,
      config?: GtagConfigParams
    ) => void;
    dataLayer?: unknown[];
  }
}

const GA_MEASUREMENT_ID = "G-BW06EQ9YRS";

function GoogleAnalyticsTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Wait for gtag to be available
    if (typeof window === "undefined" || !window.gtag) {
      return;
    }

    // Construct the full URL path
    const search = searchParams?.toString();
    const pagePath = pathname + (search ? `?${search}` : "");

    try {
      // Use 'config' command to update page_path for proper page view tracking
      // This works with GA4 and avoids duplicate events
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: pagePath,
      });
    } catch (error) {
      // Silently fail in production, but could log in development
      if (process.env.NODE_ENV === "development") {
        console.error("Google Analytics tracking error:", error);
      }
    }
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalyticsTracker() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsTrackerInner />
    </Suspense>
  );
}
