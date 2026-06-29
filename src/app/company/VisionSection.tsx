"use client";

import { useEffect, useRef, useState } from "react";
import { PuzzleVisualization } from "@/components/PuzzleVisualization";

function AnimatedVisionHeading({ visible }: { visible: boolean }) {
  const line1 = "個の専門性が重なるところに";
  const line2 = "新しい市場が生まれる";

  const renderLine = (text: string, startIndex: number) =>
    text.split("").map((char, i) => (
      <span
        key={`${startIndex}-${i}`}
        style={{
          display: "inline-block",
          opacity: 0,
          ...(visible
            ? {
                animation: "fadeInChar 0.05s ease forwards",
                animationDelay: `${0.3 + (startIndex + i) * 0.06}s`,
              }
            : {}),
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <h2 className="text-2xl md:text-4xl font-extralight tracking-wide mb-6" style={{ color: "#f0ede8" }}>
      {renderLine(line1, 0)}
      <br />
      {renderLine(line2, line1.length)}
    </h2>
  );
}

export default function VisionSection() {
  const visionRef = useRef<HTMLDivElement>(null);
  const [isVisionVisible, setIsVisionVisible] = useState(false);

  useEffect(() => {
    const element = visionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisionVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ backgroundColor: "#0a0a0a", overflow: "hidden" }} className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-8 lg:px-16">
        <div ref={visionRef} className="text-center mb-20">
          <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "#C0392B" }}>
            Our Vision
          </p>
          <AnimatedVisionHeading visible={isVisionVisible} />
          <p className="text-sm font-light leading-relaxed" style={{ color: "#8a8a8a" }}>
            各分野のプロが集まり、時代が求めるビジネスを創る。
          </p>
        </div>

        <div className="flex justify-center">
          <PuzzleVisualization />
        </div>

        <p className="text-center text-xs tracking-[0.2em] mt-4" style={{ color: "#4a4a4a" }}>
          — 交わるところに、新しい価値が生まれる —
        </p>
      </div>
    </section>
  );
}
