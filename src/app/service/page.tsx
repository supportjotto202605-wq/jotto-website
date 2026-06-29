"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function HeroSection() {
  const [visible, setVisible] = useState(false);
  const text = "Our Services";

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="min-h-[50vh] flex flex-col items-center justify-center px-6 py-24 pt-32" style={{ backgroundColor: "#0a0a0a" }}>
      <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#C0392B" }}>
        Service
      </p>
      <p className="text-xl md:text-2xl font-extralight tracking-[0.15em] mb-4" style={{ color: "#4a4a4a" }}>
        事業紹介
      </p>
      <div className="w-64 h-px mb-6" style={{ backgroundColor: "#C0392B" }} />
      <h1 className="text-5xl md:text-7xl font-extralight tracking-[0.2em] text-center" style={{ color: "#f0ede8" }}>
        {text.split("").map((char, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: 0,
              ...(visible
                ? {
                    animation: "fadeInChar 0.05s ease forwards",
                    animationDelay: `${0.3 + i * 0.06}s`,
                  }
                : {}),
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    </section>
  );
}

function ServiceDetailSection({
  title,
  titleEn,
  description,
  features,
  image,
  reversed = false,
}: {
  title: string;
  titleEn: string;
  description: string;
  features: string[];
  image: string;
  reversed?: boolean;
}) {
  const bgColor = reversed ? "#0a0a0a" : "#141414";

  return (
    <section style={{ backgroundColor: bgColor }} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={`${reversed ? "lg:order-2 lg:pl-8" : "lg:pr-8"}`}>
            <p className="text-[#C0392B] text-xs tracking-[0.3em] uppercase mb-4">{titleEn}</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight text-[#f0ede8] mb-8 leading-tight tracking-wide">
              {title}
            </h2>
            <p className="text-[#8a8a8a] font-light leading-relaxed mb-8">{description}</p>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-4 text-[#8a8a8a] font-light">
                  <span className="w-1.5 h-1.5 bg-[#C0392B] rounded-full mt-2 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={`relative aspect-[4/3] overflow-hidden ${reversed ? "lg:order-1" : ""}`}>
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 border border-[rgba(255,255,255,0.1)]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCTASection() {
  return (
    <section style={{ backgroundColor: "#141414" }} className="py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <p className="text-[#C0392B] text-xs tracking-[0.3em] uppercase mb-4">Contact</p>
        <h2 className="text-3xl md:text-5xl font-extralight text-[#f0ede8] tracking-wide mb-8">
          お問い合わせ
        </h2>
        <p className="text-[#8a8a8a] font-light leading-relaxed max-w-2xl mx-auto mb-12">
          各サービスの詳細やお見積もりについて、お気軽にご相談ください。
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-4 px-10 py-5 font-light tracking-[0.1em] transition-all duration-300"
          style={{ backgroundColor: "#C0392B", color: "#f0ede8" }}
        >
          <span>Contact Us</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

export default function ServicePage() {
  const services = [
    {
      title: "不動産管理事業",
      titleEn: "Property Management",
      description: "賃貸物件の管理・運営からオーナー様のサポートまで、不動産に関するあらゆるニーズにお応えします。",
      features: [
        "賃貸物件の入居者募集・契約管理",
        "建物メンテナンス・修繕対応",
        "家賃収納代行・滞納管理",
        "オーナー様への定期報告・相談対応",
      ],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    },
    {
      title: "不動産コンサル事業",
      titleEn: "Real Estate Consulting",
      description: "不動産投資、資産運用から開発プロジェクトまで、専門知識を活かしたコンサルティングを提供します。",
      features: [
        "不動産投資戦略の立案",
        "資産運用・ポートフォリオ構築",
        "不動産開発プロジェクト支援",
        "市場調査・デューデリジェンス",
      ],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    },
    {
      title: "アウトソーシング事業",
      titleEn: "Outsourcing",
      description: "業務効率化を実現するアウトソーシングサービス。コア業務に集中できる環境を提供します。",
      features: [
        "経理・会計業務代行",
        "人事・労務管理サポート",
        "カスタマーサポート代行",
        "データ入力・事務作業代行",
      ],
      image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80",
    },
    {
      title: "プロダクト開発事業",
      titleEn: "Product Development",
      description: "アイデアをプロダクトに。WebアプリからモバイルアプリまでJottoが一気通貫で開発・運用をサポートします。",
      features: [
        "Webアプリケーション開発",
        "モバイルアプリ開発（iOS/Android）",
        "業務システム構築・カスタマイズ",
        "DX推進コンサルティング",
      ],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    },
  ];

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#0a0a0a", color: "#f0ede8" }}>
      <HeroSection />
      {services.map((service, index) => (
        <ServiceDetailSection key={service.title} {...service} reversed={index % 2 === 1} />
      ))}
      <ContactCTASection />
    </main>
  );
}
