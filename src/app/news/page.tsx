"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const newsItems = [
  {
    date: "2026 / 06",
    category: "SERVICE",
    title: "Webアプリ「禁煙ペイ」　リリース",
    body: "禁煙の誓約と自動課金を組み合わせた禁煙サポートアプリ「禁煙ペイ」をリリースしました。",
  },
  {
    date: "2026 / 06",
    category: "NEWS",
    title: "株式会社Jotto コーポレートサイトをオープンしました",
    body: "株式会社Jottoのコーポレートサイトを公開いたしました。今後ともよろしくお願いいたします。",
  },
  {
    date: "2026 / 05",
    category: "NEWS",
    title: "株式会社Jotto 設立",
    body: "2026年5月1日、株式会社Jottoを設立いたしました。",
  },
];

const categories = ["すべて", "NEWS", "SERVICE"];

export default function NewsPage() {
  const [active, setActive] = useState("すべて");
  const [visible, setVisible] = useState(false);
  const text = "Information";

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  const filtered = active === "すべて" ? newsItems : newsItems.filter((n) => n.category === active);

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#0a0a0a", color: "#f0ede8" }}>
      {/* Hero */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center px-6 py-24 pt-32" style={{ backgroundColor: "#0a0a0a" }}>
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#C0392B" }}>
          News
        </p>
        <p className="text-xl md:text-2xl font-extralight tracking-[0.15em] mb-4" style={{ color: "#4a4a4a" }}>
          お知らせ
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

      {/* Filter + List */}
      <section className="py-24" style={{ backgroundColor: "#141414" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Category filter */}
          <div className="flex flex-wrap gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="px-5 py-2 text-xs tracking-[0.2em] font-light transition-all duration-300"
                style={{
                  backgroundColor: active === cat ? "#C0392B" : "transparent",
                  color: active === cat ? "#f0ede8" : "#8a8a8a",
                  border: active === cat ? "1px solid #C0392B" : "1px solid rgba(255,255,255,0.15)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* News list */}
          <div className="border-t" style={{ borderColor: "#2a2a2a" }}>
            {filtered.map((item, index) => (
              <div key={index} className="py-10 border-b" style={{ borderColor: "#2a2a2a" }}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-light tracking-wide" style={{ color: "#8a8a8a" }}>
                    {item.date}
                  </span>
                  <span
                    className="text-xs tracking-wide px-2 py-0.5 border"
                    style={{ color: "#C0392B", borderColor: "rgba(192,57,43,0.4)" }}
                  >
                    {item.category}
                  </span>
                </div>
                <h2 className="text-lg font-extralight mb-3" style={{ color: "#f0ede8" }}>
                  {item.title}
                </h2>
                <p className="text-sm font-light leading-relaxed" style={{ color: "#8a8a8a" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
