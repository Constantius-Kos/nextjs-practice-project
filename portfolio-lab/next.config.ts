import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  reactCompiler: false,
  cacheLife: {
    'commits': {
      stale: 60,
      revalidate: 60,
      expire: 60
    },
    'weather': {
      stale: 600,
      revalidate: 600,
      expire: 6000
    },
    'api-default': {
      stale: 10,
      revalidate: 15,
      expire: 6000
    },
    'infinite': {
      stale: 31536000,
      revalidate: 31536000,
      expire: 31536000
    }
  },
};

export default nextConfig;
