import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_JP } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import SiteEffects from "@/components/SiteEffects";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: {
    default: "株式会社Jotto",
    template: "%s | 株式会社Jotto",
  },
  description:
    "株式会社Jottoは、不動産管理・不動産コンサル・アウトソーシング・IT事業の4領域で、お客様のビジネス課題を解決するパートナーです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${cormorant.variable} ${notoSansJP.variable} antialiased`}>
        <CustomCursor />
        <Header />
        <main>{children}</main>
        <SiteEffects />
      </body>
    </html>
  );
}
