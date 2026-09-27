import type { NextConfig } from "next";

// IS_PAGES_BUILD=1 is set by the Pages deploy workflow; local builds stay at the repo root.
const isPagesBuild = process.env.IS_PAGES_BUILD === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pages build: export static HTML at the project basePath.
  // Local stays a normal server build so `next start` keeps working.
  ...(isPagesBuild
    ? { output: "export" as const, basePath: "/aydin-khan-portfolio" }
    : {}),
  // Pages has no image optimization server, so serve images as-is.
  images: { unoptimized: true },
};

export default nextConfig;
