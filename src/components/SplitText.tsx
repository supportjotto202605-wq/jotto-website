"use client";

import { useEffect, useRef, useState, type ElementType } from "react";

type SplitTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Mount時に即アニメーション（ヒーロー用） */
  playOnMount?: boolean;
  /** Mount後の遅延（秒） */
  mountDelay?: number;
};

export default function SplitText({
  text,
  as: Tag = "span",
  className = "",
  playOnMount = false,
  mountDelay = 0,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (playOnMount) {
      const timer = window.setTimeout(() => setVisible(true), mountDelay * 1000);
      return () => window.clearTimeout(timer);
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted, playOnMount, mountDelay]);

  const splitClassName = `split-text ${visible ? "is-visible" : ""} ${className}`.trim();

  if (!mounted) {
    return (
      <Tag className={className} suppressHydrationWarning>
        {text}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={splitClassName}
      aria-label={text}
      suppressHydrationWarning
    >
      {Array.from(text).map((char, index) => (
        <span
          key={`${index}-${char}`}
          className="split-char"
          style={{ transitionDelay: `${index * 0.04}s` }}
          aria-hidden
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
}
