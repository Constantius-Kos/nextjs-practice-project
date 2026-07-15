import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  reactCompiler: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
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
