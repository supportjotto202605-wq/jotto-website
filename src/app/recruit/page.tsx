"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

function HeroSection() {
  const [visible, setVisible] = useState(false);
  const text = "Careers";

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="min-h-[50vh] flex flex-col items-center justify-center px-6 py-24 pt-32" style={{ backgroundColor: "#0a0a0a" }}>
      <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#C0392B" }}>
        Recruit
      </p>
      <p className="text-xl md:text-2xl font-extralight tracking-[0.15em] mb-4" style={{ color: "#4a4a4a" }}>
        採用情報
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

function MessageSection() {
  return (
    <section className="bg-[#141414] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200"
              alt="Jotto Team"
              fill
              className="object-cover"
              style={{ filter: "grayscale(100%)" }}
            />
            <div className="absolute inset-0 border border-[rgba(255,255,255,0.1)]" />
          </div>
          <div className="lg:pl-8">
            <p className="text-[#C0392B] text-xs tracking-[0.3em] uppercase mb-4">Message</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extralight text-[#f0ede8] mb-8 leading-tight tracking-wide">
              Jottoで、未来を一緒に<br />創りませんか？
            </h2>
            <div className="space-y-6 text-[#8a8a8a] font-light leading-relaxed">
              <p>多様なバックグラウンドを持つメンバーが活躍できる環境で、あなたの可能性を最大限に発揮してください。</p>
              <p>Jottoは、不動産管理からIT開発まで幅広い事業を展開する総合企業です。一人ひとりが裁量を持ち、主体的にプロジェクトを推進できる環境があります。</p>
              <p>共に成長し、新しい価値を創造していく仲間を、私たちは心からお待ちしています。</p>
            </div>
            <div className="mt-10">
              <p className="text-[#f0ede8] font-light">
                代表取締役　<span className="text-[#C0392B]">大野 一樹</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyJottoSection() {
  const reasons = [
    {
      title: "成長環境",
      titleEn: "Growth",
      description:
        "最新技術と多様な事業領域で、常に新しいチャレンジができます。スキルアップを支援する研修制度や資格取得支援も充実しています。",
    },
    {
      title: "チームワーク",
      titleEn: "Teamwork",
      description:
        "少数精鋭のチームで、一人ひとりの意見が会社を動かします。フラットな組織文化で、年次に関係なく意見を発信できます。",
    },
    {
      title: "柔軟な働き方",
      titleEn: "Flexibility",
      description:
        "リモートワーク・フレックス制度など、働きやすい環境を整備。ワークライフバランスを大切にしながら、成果を出せる環境です。",
    },
  ];

  return (
    <section className="bg-[#0a0a0a] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-[#C0392B] text-xs tracking-[0.3em] uppercase mb-4">Why Jotto</p>
          <h2 className="text-3xl md:text-5xl font-extralight text-[#f0ede8] tracking-wide">Jottoで働く理由</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="group p-8 lg:p-10 border border-[rgba(255,255,255,0.1)] hover:border-[rgba(192,57,43,0.3)] transition-colors duration-500"
            >
              <p className="text-[#C0392B] text-xs tracking-[0.2em] uppercase mb-2">{reason.titleEn}</p>
              <h3 className="text-2xl font-extralight text-[#f0ede8] mb-4 tracking-wide">{reason.title}</h3>
              <p className="text-[#8a8a8a] text-sm font-light leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OpenPositionsSection() {
  const positions = [
    {
      title: "事業開発プロジェクトマネージャー",
      titleEn: "PROJECT MANAGEMENT",
      type: "正社員",
      location: "東京",
      description: "新規事業プロジェクトのご提案から、自社サービスの開拓に寄与できる方",
    },
    {
      title: "不動産営業・管理スタッフ",
      titleEn: "PROPERTY MANAGEMENT",
      type: "正社員",
      location: "東京",
      description: "売買物件の営業・オーナー対応・物件管理業務全般",
    },
    {
      title: "エンジニア（Web/アプリ開発）",
      titleEn: "ENGINEER",
      location: "東京",
      type: "正社員",
      description: "自社サービスおよび受託開発のWebアプリケーション・モバイルアプリの設計・開発",
    },
    {
      title: "携帯販売スタッフ",
      titleEn: "SALES",
      type: "正社員/業務委託",
      location: "東京・千葉・神奈川・埼玉",
      description: "携帯ショップ・家電量販店における販売支援全般",
    },
  ];

  return (
    <section className="bg-[#141414] py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-[#C0392B] text-xs tracking-[0.3em] uppercase mb-4">Open Positions</p>
          <h2 className="text-3xl md:text-5xl font-extralight text-[#f0ede8] tracking-wide">募集職種</h2>
        </div>
        <div className="space-y-4">
          {positions.map((position) => (
            <div
              key={position.title}
              className="group bg-[#0a0a0a] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(192,57,43,0.3)] transition-all duration-500 p-6 lg:p-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                <div className="flex-1">
                  <p className="text-[#C0392B] text-xs tracking-[0.2em] uppercase mb-1">{position.titleEn}</p>
                  <h3 className="text-xl lg:text-2xl font-extralight text-[#f0ede8] mb-2 group-hover:text-[#C0392B] transition-colors duration-300">
                    {position.title}
                  </h3>
                  <p className="text-[#8a8a8a] text-sm font-light">{position.description}</p>
                </div>
                <div className="flex items-center gap-4 lg:gap-6 shrink-0">
                  <span className="text-[#8a8a8a] text-xs">{position.type}</span>
                  <span className="text-[#2a2a2a]">|</span>
                  <span className="text-[#8a8a8a] text-xs">{position.location}</span>
                  <Link
                    href="/contact"
                    className="w-10 h-10 border border-[rgba(240,237,232,0.3)] flex items-center justify-center text-[#f0ede8] hover:bg-[#f0ede8] hover:text-[#0a0a0a] transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCTASection() {
  return (
    <section className="bg-[#0a0a0a] py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <p className="text-[#C0392B] text-xs tracking-[0.3em] uppercase mb-4">Contact</p>
        <h2 className="text-3xl md:text-5xl font-extralight text-[#f0ede8] tracking-wide mb-8">
          まずはお気軽に<br className="md:hidden" />ご連絡ください
        </h2>
        <p className="text-[#8a8a8a] font-light leading-relaxed max-w-2xl mx-auto mb-12">
          採用に関するご質問、カジュアル面談のご希望など、どんな些細なことでもお気軽にお問い合わせください。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-4 px-10 py-5 font-light tracking-[0.1em] transition-all duration-300"
            style={{ backgroundColor: "#C0392B", color: "#f0ede8" }}
          >
            <span>エントリーする</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="mailto:careers@jotto.co.jp"
            className="inline-flex items-center gap-4 border border-[rgba(240,237,232,0.3)] px-10 py-5 font-light tracking-[0.1em] text-[#f0ede8] hover:bg-[#f0ede8] hover:text-[#0a0a0a] transition-all duration-300"
          >
            <span>メールで問い合わせ</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function RecruitPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#0a0a0a", color: "#f0ede8" }}>
      <HeroSection />
      <MessageSection />
      <WhyJottoSection />
      <OpenPositionsSection />
      <ContactCTASection />
    </main>
  );
}
