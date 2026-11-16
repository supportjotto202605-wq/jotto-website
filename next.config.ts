import type { NextConfig } from "next";

/* 全ページに付ける保護用のヘッダー */
const securityHeaders = [
  // 他サイトの枠内に埋め込まれるのを防ぐ(なりすまし・クリック誘導対策)
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'" },
  // 常に暗号化通信(HTTPS)で接続させる
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // 使っていない端末機能(カメラ・マイク・位置情報など)を無効にする
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // 廃止したページへのアクセスは事業紹介へ
      { source: "/service/property-management", destination: "/service", permanent: true },
    ];
  },
};

export default nextConfig;
