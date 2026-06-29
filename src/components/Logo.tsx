"use client";

import Link from "next/link";
import { forwardRef, type CSSProperties } from "react";

type LogoProps = {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  alt?: string;
  style?: CSSProperties;
};

export const LogoImage = forwardRef<HTMLImageElement, LogoProps>(function LogoImage(
  {
    className = "",
    width = 420,
    height = 160,
    priority = false,
    alt = "Jotto",
    style,
  },
  ref
) {
  return (
    <img
      ref={ref}
      src="/jotto-logo.svg"
      alt={alt}
      style={{ width: "100%", height: "auto", maxWidth: `${width}px`, ...style }}
      className={className}
    />
  );
});

export function LogoLink({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`logo-link ${className}`}>
      <LogoImage
        className="h-[27px] w-auto"
        width={70}
        height={27}
        alt="株式会社Jotto"
      />
    </Link>
  );
}

export function LadybugSvg({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <circle cx="16" cy="6" r="4" fill="#000000" />
      <path
        d="M14 3L12 2"
        stroke="#C0392B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18 3L20 2"
        stroke="#C0392B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse cx="16" cy="19" rx="10" ry="12" fill="#C0392B" />
      <line x1="16" y1="8" x2="16" y2="31" stroke="#000000" strokeWidth="2" />
      <circle cx="11" cy="14" r="2" fill="#000000" />
      <circle cx="10" cy="22" r="2.5" fill="#000000" />
      <circle cx="12" cy="28" r="1.5" fill="#000000" />
      <circle cx="21" cy="14" r="2" fill="#000000" />
      <circle cx="22" cy="22" r="2.5" fill="#000000" />
      <circle cx="20" cy="28" r="1.5" fill="#000000" />
    </svg>
  );
}
