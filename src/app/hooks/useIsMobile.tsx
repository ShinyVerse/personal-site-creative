"use client";

import { useLayoutEffect, useState } from "react";

/**
 * Hook to detect if the viewport is mobile (< 768px)
 * Uses useLayoutEffect to prevent hydration mismatch and layout shift
 * 
 * @returns boolean indicating if viewport is mobile
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  // Use useLayoutEffect for immediate synchronous update to prevent layout shift
  useLayoutEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    // Set initial value immediately
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Return false as fallback during SSR/initial render to prevent hydration mismatch
  // This assumes desktop-first, which is safer for SSR
  return isMobile ?? false;
}
