import type { Metadata, Viewport } from "next";
import { Jost, Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

const zenMaru = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zen",
  display: "swap",
});

const description =
  "株式会社Jottoは、不動産管理・不動産コンサル・アウトソーシング・プロダクト開発の4領域で、お客様のビジネス課題を解決するパートナーです。";

export const metadata: Metadata = {
  metadataBase: new URL("https://jotto.co.jp"),
  title: {
    default: "株式会社Jotto",
    template: "%s | 株式会社Jotto",
  },
  description,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://jotto.co.jp",
    siteName: "株式会社Jotto",
    title: "株式会社Jotto",
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "株式会社Jotto" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "株式会社Jotto",
    description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${jost.variable} ${zenMaru.variable}`}>{children}</body>
    </html>
  );
}
