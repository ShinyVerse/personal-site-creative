import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
    ],
  },
  experimental: {
    turbopack: {
      // Explicitly set the root to prevent Next.js from detecting parent lockfiles
      root: '.',
    },
  },
};

export default nextConfig;
