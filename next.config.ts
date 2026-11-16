import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      // 廃止したページへのアクセスは事業紹介へ
      { source: "/service/property-management", destination: "/service", permanent: true },
    ];
  },
};

export default nextConfig;
