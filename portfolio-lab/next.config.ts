import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  reactCompiler: false,
  cacheLife: {
    'commits': {
      stale: 900,
      revalidate: 1800,
      expire: 3600
    },
    // 'weather': {
    //   stale: 600,
    //   revalidate: 600,
    //   expire: 6000
    // },
    // 'api-default': {
    //   stale: 10,
    //   revalidate: 15,
    //   expire: 6000
    // }
  },
};

export default nextConfig;
