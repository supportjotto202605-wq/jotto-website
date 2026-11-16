import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Arw, Cta, PageHero, SecHead, Shell } from "@/pop/parts";

export const metadata: Metadata = {
  title: "採用情報",
  description: "株式会社Jottoの採用情報。共に未来をつくる仲間を募集しています。",
  alternates: { canonical: "/recruit" },
};

const reasons = [
  { n: "01", en: "Growth", title: "成長環境", text: "最新技術と多様な事業領域で、常に新しいチャレンジができます。スキルアップを支援する研修制度や資格取得支援も充実しています。" },
  { n: "02", en: "Teamwork", title: "チームワーク", text: "少数精鋭のチームで、一人ひとりの意見が会社を動かします。フラットな組織文化で、年次に関係なく意見を発信できます。" },
  { n: "03", en: "Flexibility", title: "柔軟な働き方", text: "リモートワーク・フレックス制度など、働きやすい環境を整備。ワークライフバランスを大切にしながら、成果を出せる環境です。" },
];

const jobs = [
  { title: "事業開発プロジェクトマネージャー", type: "正社員", location: "東京", text: "新規事業プロジェクトのご提案から、自社サービスの開拓に寄与できる方" },
  { title: "エンジニア（Web/アプリ開発）", type: "正社員", location: "東京", text: "自社サービスおよび受託開発のWebアプリケーション・モバイルアプリの設計・開発" },
  { title: "携帯販売スタッフ", type: "正社員/業務委託", location: "東京・千葉・神奈川・埼玉", text: "携帯ショップ・家電量販店における販売支援全般" },
];

export default function Page() {
  return (
    <Shell kind="lower" cur="recruit">
      <PageHero crumbs={[{ href: "/", label: "トップ" }, { label: "採用情報" }]} lines={["Recruit"]} num="03" label="採用情報" />

      <section className="blk lt" data-th="l">
        <i className="an" data-a="" style={{ left: "46.5%", top: "190px" }} />
        <SecHead num="01" en="Message" ja="メッセージ" />
        <div className="g2 tp">
          <div className="io">
            <h2 className="jh up" style={{ fontSize: "clamp(26px,3.3vw,50px)" }}>
              Jottoで、
              <br />
              未来を一緒に
              <br />
              創りませんか？
            </h2>
          </div>
          <div className="io">
            <p className="bd up" style={{ marginBottom: "18px" }}>
              多様なバックグラウンドを持つメンバーが活躍できる環境で、あなたの可能性を最大限に発揮してください。
            </p>
            <p className="bd up" style={{ "--d": ".1s", marginBottom: "18px" } as CSSProperties}>
              Jottoは、不動産コンサルからIT開発まで幅広い事業を展開する総合企業です。一人ひとりが裁量を持ち、主体的にプロジェクトを推進できる環境があります。
            </p>
            <p className="bd up" style={{ "--d": ".2s", marginBottom: 0 } as CSSProperties}>
              共に成長し、新しい価値を創造していく仲間を、私たちは心からお待ちしています。
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
        <i className="an" data-a="" style={{ left: "calc(var(--px) * .45)", top: "230px" }} />
        <SecHead num="02" en="Why Jotto" ja="Jottoで働く理由" />
        <div className="rs io">
          {reasons.map((r, k) => (
            <div key={r.n} className="fs up" data-lt="" style={{ "--d": `${k * 0.1}s` } as CSSProperties}>
              <div className="fs-h">
                <i className="fs-n" data-a="" data-ay="-1.15" data-lit="">
                  {r.n}
                </i>
                {r.en}
              </div>
              <b>{r.title}</b>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="blk lt" data-th="l">
        <i className="an" data-a="" style={{ right: "calc(var(--px) * .5)", top: "120px" }} />
        <SecHead num="03" en="Positions" ja="募集職種" />
        <div className="io">
          {jobs.map((j, k) => (
            <Link key={j.title} className="jb up" style={{ "--d": `${k * 0.06}s` } as CSSProperties} href={`/contact?kind=apply&position=${encodeURIComponent(j.title)}`}>
              <span>
                <span className="jb-t">
                  <span>{j.type}</span>
                  <span>{j.location}</span>
                </span>
                <b>{j.title}</b>
                <span className="jb-p">{j.text}</span>
              </span>
              <i>
                <Arw />
              </i>
            </Link>
          ))}
        </div>
        <i className="an" data-a="" style={{ right: "calc(var(--px) * .5)", bottom: "110px" }} />
      </section>

      <Cta title="Join us" text="採用に関するご質問、カジュアル面談のご希望など、お気軽にお問い合わせください" label="エントリーする" href="/contact?kind=apply" />
    </Shell>
  );
}
