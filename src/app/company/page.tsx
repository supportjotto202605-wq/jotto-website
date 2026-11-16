import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { Cta, PageHero, SecHead, Shell } from "@/pop/parts";

export const metadata: Metadata = {
  title: "企業情報",
  description: "株式会社Jottoの企業情報。代表メッセージと会社概要をご紹介します。",
  alternates: { canonical: "/company" },
};

const rows: { en: string; ja: string; value: ReactNode }[] = [
  { en: "Company name", ja: "会社名", value: <>株式会社Jotto<small>Jotto Inc.</small></> },
  { en: "Address", ja: "所在地", value: <>〒170-0012<br />東京都豊島区上池袋3-16-16 フォリスタ上池袋301</> },
  { en: "Established", ja: "設立", value: "2026年6月" },
  { en: "CEO", ja: "代表者", value: <>代表取締役　大野一樹<small>Kazuki Ono</small></> },
  { en: "Capital", ja: "資本金", value: "88万円" },
  { en: "Business", ja: "事業内容", value: "不動産コンサル事業・アウトソーシング事業・プロダクト開発事業" },
  { en: "Email", ja: "メールアドレス", value: "info@jotto.co.jp" },
  { en: "Invoice number", ja: "適格請求書発行事業者登録番号", value: "T5013301056317" },
];

export default function Page() {
  return (
    <Shell kind="lower" cur="company">
      <PageHero crumbs={[{ href: "/", label: "トップ" }, { label: "企業情報" }]} lines={["Company"]} num="01" label="企業情報" />

      <section className="blk lt" data-th="l">
        <i className="an" data-a="" style={{ left: "46.5%", top: "190px" }} />
        <SecHead num="01" en="Message" ja="メッセージ" />
        <div className="g2 tp">
          <div className="io">
            <h2 className="jh up" style={{ fontSize: "clamp(26px,3.3vw,50px)" }}>
              可能性をビジネスに
              <br />
              共に活躍を
              <br />
              拡げられる環境を
              <br />
              生み出す
            </h2>
          </div>
          <div className="io">
            <p className="bd up" style={{ marginBottom: "18px" }}>
              株式会社Jottoは、不動産・テクノロジー・アウトソーシングの三領域を融合し、お客様のビジネス基盤ごと支えるパートナーです。
            </p>
            <p className="bd up" style={{ "--d": ".1s", marginBottom: "18px" } as CSSProperties}>
              私たちが大切にしているのは、各分野の専門家が持つ知見を掛け合わせ、一社一社のビジネス課題に対して最適なソリューションを提供することです。
            </p>
            <p className="bd up" style={{ "--d": ".2s", marginBottom: 0 } as CSSProperties}>
              変化の激しい時代だからこそ、柔軟かつ迅速に動ける組織でありながら、長期的な信頼関係を築くことを使命としています。
            </p>
            <div className="sg up" style={{ "--d": ".3s" } as CSSProperties}>
              <i>
                <svg viewBox="0 0 32 32" aria-hidden="true">
                  <use href="#jbugw" />
                </svg>
              </i>
              <div>
                <span>代表取締役</span>
                <b>大野一樹</b>
              </div>
            </div>
          </div>
        </div>
        <i className="an" data-a="" style={{ left: "46.5%", bottom: "150px" }} />
      </section>

      <section className="blk dk" data-th="d">
        <SecHead num="02" en="Overview" ja="会社概要" />
        <dl className="ovl io">
          {rows.map((r, k) => (
            <div key={r.en} className="ov up" data-lt="" style={{ "--d": `${Math.min(k, 5) * 0.05}s` } as CSSProperties}>
              <i className="nd" data-a="" data-lit="" />
              <dt>
                <span>{r.en}</span>
                {r.ja}
              </dt>
              <dd>{r.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Cta title="Let’s work together" text="お問い合わせはWebフォームより承っております" label="お問い合わせ" href="/contact" side="l" />
    </Shell>
  );
}
