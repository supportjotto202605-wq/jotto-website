"use client";

import { useEffect, useRef } from "react";
import { LogoImage } from "./Logo";
import SplitText from "./SplitText";

export default function HeroAnimated() {
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const logRects = () => {
      const rect = logoRef.current?.getBoundingClientRect();
      console.log("Logo rect:", rect);
    };

    logRects();
    window.addEventListener("resize", logRects);
    return () => window.removeEventListener("resize", logRects);
  }, []);

  return (
    <section className="hero-section relative flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-[10%] py-[120px]">
      <div className="flex flex-col items-center text-center">
        <div className="hero-logo-enter">
          <LogoImage
            ref={logoRef}
            className="w-[400px] max-w-[min(90vw,400px)]"
            width={400}
            height={154}
            priority
          />
        </div>
        <p className="hero-company-name">株式会社 Jotto</p>
        <h1 className="font-en text-[clamp(28px,3.5vw,48px)] font-light leading-[1.35] tracking-[0.04em]">
          <SplitText
            text="Bridging Business. Building the Future."
            as="span"
            playOnMount
            mountDelay={1.5}
            className="inline"
          />
        </h1>
      </div>

      <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 font-en text-[9px] tracking-[0.3em] text-[var(--subtext)]">
        SCROLL
        <span className="block h-12 w-px bg-gradient-to-b from-[var(--subtext)] to-transparent" />
      </div>
    </section>
  );
}
