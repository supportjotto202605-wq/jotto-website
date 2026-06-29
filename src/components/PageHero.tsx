"use client";

import SplitText from "./SplitText";

type PageHeroProps = {
  label: string;
  title: string;
  subtitle: string;
  titleClassName?: string;
};

export default function PageHero({
  label,
  title,
  subtitle,
  titleClassName = "",
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <span className="section-label text-[15px] tracking-[6px]">{label}</span>
      <SplitText
        text={title}
        as="h1"
        className={`section-title ${titleClassName}`.trim()}
      />
      <p className="section-title-ja !mb-0">{subtitle}</p>
    </section>
  );
}
