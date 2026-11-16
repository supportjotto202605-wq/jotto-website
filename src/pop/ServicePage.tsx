import Link from "next/link";
import type { CSSProperties } from "react";
import { services } from "@/data/services";
import { Arw, Cta, PageHero, SecHead, Shell } from "./parts";

const cap = (s: string) =>
  s
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

/* 事業詳細ページ(4事業共通の型)。内容は src/data/services.ts */
export default function ServicePage({ slug }: { slug: string }) {
  const sv = services.find((s) => s.slug === slug) ?? services[0];
  const others = services.filter((s) => s.slug !== sv.slug);
  const contact = `/contact?service=${sv.slug}`;
  return (
    <Shell kind="lower" cur="service">
      <PageHero
        crumbs={[{ href: "/", label: "トップ" }, { href: "/service", label: "事業紹介" }, { label: sv.title }]}
        lines={sv.enLines}
        num={sv.num}
        label={sv.title}
      >
        <div className="pa-w fd" style={{ animationDelay: ".4s" }} aria-hidden="true">
          <canvas className="pa" data-art={Number(sv.num)} />
          <span className="pa-n">{sv.num}</span>
        </div>
      </PageHero>

      <section className="blk lt" data-th="l">
        <i className="an" data-a="" style={{ left: "calc(var(--px) * .5)", top: "150px" }} />
        <SecHead num="01" en="What we do" ja="提供内容" />
        <div className="g2 tp">
          <div className="io">
            {sv.details.map((d, k) => (
              <div key={d} className="dt up" data-lt="" style={{ "--d": `${k * 0.08}s` } as CSSProperties}>
                <i data-a="" data-ax="-.52" data-lit="">
                  {String(k + 1).padStart(2, "0")}
                </i>
                {d}
              </div>
            ))}
          </div>
          <div className="io">
            <h2 className="jh up" style={{ fontSize: "clamp(24px,3vw,46px)" }}>
              {sv.head.map((h, k) => (
                <span key={h}>
                  {k > 0 && <br />}
                  {h}
                </span>
              ))}
            </h2>
            <p className="bd up" style={{ "--d": ".12s" } as CSSProperties}>
              {sv.desc}
            </p>
            <Link className="btn up" style={{ "--d": ".24s" } as CSSProperties} href={contact}>
              この事業について相談する
              <i>
                <Arw />
              </i>
            </Link>
          </div>
        </div>
      </section>

      <section className="blk dk" data-th="d">
        <i className="an" data-a="" style={{ left: "calc(var(--px) * .45)", top: "230px" }} />
        <SecHead num="02" en="Flow" ja="ご相談の流れ" />
        <div className="sv-h io">
          <h2 className="dh en up">How it works</h2>
          <p className="bd up" style={{ margin: 0, "--d": ".15s" } as CSSProperties}>
            お問い合わせからご提案まで、
            <br />
            Webフォームを起点に進めます。
          </p>
        </div>
        <div className="fl io">
          {[
            ["01", "Contact", "お問い合わせ", "Webフォームからご相談内容をお送りください。"],
            ["02", "Hearing", "ヒアリング", "課題やご要望を、担当者が詳しくお伺いします。"],
            ["03", "Proposal", "ご提案", "内容に合わせて、進め方とお見積りをご提案します。"],
          ].map(([n, en, ja, tx], k) => (
            <div key={n} className="fs up" data-lt="" style={{ "--d": `${k * 0.1}s` } as CSSProperties}>
              <div className="fs-h">
                <i className="fs-n" data-a="" data-ay="-1.15" data-lit="">
                  {n}
                </i>
                {en}
              </div>
              <b>{ja}</b>
              <p>{tx}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="blk lt" data-th="l">
        <i className="an" data-a="" style={{ right: "calc(var(--px) * .5)", top: "120px" }} />
        <SecHead num="03" en="Other services" ja="その他の事業" />
        <div className="os io">
          {others.map((o, k) => (
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
              </span>
            </Link>
          ))}
        </div>
        <i className="an" data-a="" style={{ right: "calc(var(--px) * .5)", bottom: "110px" }} />
      </section>

      <Cta title="Let’s talk" text={`${sv.title}について、お気軽にご相談ください`} label="相談する" href={contact} />
    </Shell>
  );
}

export function serviceMeta(slug: string) {
  const sv = services.find((s) => s.slug === slug) ?? services[0];
  return { title: sv.title, description: sv.desc, alternates: { canonical: `/service/${sv.slug}` } };
}
