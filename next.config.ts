import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.peachworlds.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "creativemarketing.peachweb.io",
        pathname: "/**",
      },
    ],
  },
};

export default withPayload(nextConfig);
