import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.HOST_NAME}`,
        pathname: `${process.env.PATH_NAME}`,
      },
    ],
  },
};

export default nextConfig;
