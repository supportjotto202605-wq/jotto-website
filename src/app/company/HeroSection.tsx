"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const text = "About Jotto";

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="min-h-[50vh] flex flex-col items-center justify-center px-6 py-24 pt-40" style={{ backgroundColor: "#0a0a0a" }}>
      <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#C0392B" }}>
        Company
      </p>
      <p className="text-xl md:text-2xl font-extralight tracking-[0.15em] mb-4" style={{ color: "#4a4a4a" }}>
        企業情報
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
