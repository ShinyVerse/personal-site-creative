"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

// TypeScript declaration for gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views when pathname or search params change
    if (typeof window !== "undefined" && window.gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      console.log(url);
      
      window.gtag("config", "G-BW06EQ9YRS", {
        page_path: url,
        anonymize_ip: true,
      });
    }
  }, [pathname, searchParams]);

  return null;
}
