import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { services } from "@/data/services";
import { Arw, Cta, PageHero, SecHead, Shell } from "@/pop/parts";

export const metadata: Metadata = {
  title: "事業紹介",
  description: "株式会社Jottoの3つの事業(不動産コンサル・アウトソーシング・プロダクト開発)をご紹介します。",
  alternates: { canonical: "/service" },
};

const cap = (s: string) =>
  s
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export default function Page() {
  return (
    <Shell kind="lower" cur="service">
      <PageHero crumbs={[{ href: "/", label: "トップ" }, { label: "事業紹介" }]} lines={["Service"]} num="02" label="事業紹介" />
      <section className="blk lt" data-th="l">
        <i className="an" data-a="" style={{ left: "calc(var(--px) * .5)", top: "150px" }} />
        <SecHead num="02" en="Our Services" ja="3つの事業領域" />
        <div className="io">
          <p className="bd up" style={{ maxWidth: "640px" }}>
            3つの事業領域で、お客様のビジネス課題を解決します。
          </p>
        </div>
        <div className="os io">
          {services.map((o, k) => (
            <Link key={o.slug} className="oc up" style={{ "--d": `${k * 0.08}s` } as CSSProperties} href={`/service/${o.slug}`}>
              <span className="oc-t">
                <b>{o.num}</b>
                <i>
                  <Arw />
                </i>
              </span>
              <span>
                <span className="oc-e">{cap(o.en)}</span>
                <span className="oc-j">{o.title}</span>
                <span className="oc-d">{o.desc}</span>
              </span>
            </Link>
          ))}
        </div>
        <i className="an" data-a="" style={{ left: "calc(var(--px) * .5)", bottom: "110px" }} />
      </section>
      <Cta title="Let’s talk" text="各事業の詳細やお見積もりについて、お気軽にご相談ください" label="相談する" href="/contact" side="l" />
    </Shell>
  );
}
