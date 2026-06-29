"use client";

import type { ReactNode } from "react";

type ParallaxMediaProps = {
  children: ReactNode;
  className?: string;
};

export default function ParallaxMedia({ children, className = "" }: ParallaxMediaProps) {
  return (
    <div className={`parallax-wrap ${className}`.trim()} data-parallax-wrap>
      <div className="parallax-inner" data-parallax-inner>
        {children}
      </div>
    </div>
  );
}
