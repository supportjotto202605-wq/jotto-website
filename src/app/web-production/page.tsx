import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { flow, options, plans, terms } from "@/data/webPlans";
import { Arw, PageHero, SecHead, Shell } from "@/pop/parts";
import WebOrderBody from "@/pop/WebOrderBody";

export const metadata: Metadata = {
  title: "ホームページ制作",
  description:
    "株式会社Jottoのホームページ制作。打ち合わせ不要、ヒアリングシートに記入するだけ。月額費用のかからない売り切りで、4万円から承ります。",
  alternates: { canonical: "/web-production" },
};

const points = ["打ち合わせ不要。シートに書くだけ", "売り切り。月額費用はかかりません", "やり取りはメール・LINEの文章だけ", "全プラン、スマホ対応とフォームつき"];

export default function Page() {
  return (
    <Shell kind="lower">
      <PageHero crumbs={[{ href: "/", label: "トップ" }, { label: "ホームページ制作" }]} lines={["Web", "Production"]} label="ホームページ制作" />

      <section className="blk lt" data-th="l">
        <i className="an" data-a="" style={{ left: "calc(var(--px) * .5)", top: "150px" }} />
        <SecHead en="About" ja="このサービスについて" />
        <div className="g2 tp">
          <div className="io">
            <h2 className="jh up" style={{ fontSize: "clamp(24px,3vw,46px)" }}>
              書くだけで、
              <br />
              ホームページができる。
            </h2>
            <p className="bd up" style={{ "--d": ".12s" } as CSSProperties}>
              打ち合わせの時間を取らずに、ホームページを作れるサービスです。ヒアリングシートにご希望を記入していただき、その内容をもとに制作します。打ち合わせをしない分、費用を抑えてお届けします。
            </p>
            <div className="btns up" style={{ "--d": ".24s" } as CSSProperties}>
              <a className="btn" href="#apply">
                ヒアリングシートを書く
                <i>
                  <Arw />
                </i>
              </a>
              <a className="btn lineb" href="https://line.me/R/ti/p/@457zuanz" target="_blank" rel="noopener noreferrer">
                LINEで相談する
                <i>
                  <Arw />
                </i>
              </a>
            </div>
          </div>
          <div className="io">
            {points.map((d, k) => (
              <div key={d} className="dt up" data-lt="" style={{ "--d": `${k * 0.08}s` } as CSSProperties}>
                <i data-a="" data-ax="-.52" data-lit="">
                  {String(k + 1).padStart(2, "0")}
                </i>
                {d}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="blk dk" data-th="d" id="plans">
        <i className="an" data-a="" style={{ left: "calc(var(--px) * .45)", top: "230px" }} />
        <SecHead en="Plans" ja="料金プラン" />
        <div className="sv-h io">
          <h2 className="dh en up">Price</h2>
          <p className="bd up" style={{ margin: 0, "--d": ".15s" } as CSSProperties}>
            すべて売り切りの料金です。
            <br />
            月額の費用はかかりません。
          </p>
        </div>
        <div className="pl io">
          {plans.map((p, k) => (
            <div key={p.key} className={p.pick ? "pc pk up" : "pc up"} data-lt="" style={{ "--d": `${k * 0.1}s` } as CSSProperties}>
              {p.pick && <span className="pc-r">おすすめ</span>}
              <div className="pc-h">
                <i className="pc-n" {...(k === 0 ? { "data-a": "", "data-ax": "-1", "data-lit": "" } : {})}>
                  {String(k + 1).padStart(2, "0")}
                </i>
                {p.en}
              </div>
              <b className="pc-j">{p.name}</b>
              <p className="pc-l">{p.lead}</p>
              <p className="pc-p">
                <span className="en">{p.price}</span>万円
                <small>（{p.tax}）</small>
              </p>
              <ul>
                {p.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <a className="pc-b" href="#apply" data-act="kind" data-k={p.key}>
                このプランで申し込む
                <i>
                  <Arw />
                </i>
              </a>
            </div>
          ))}
        </div>
        <h3 className="wsub io">
          <span className="up">追加オプション</span>
        </h3>
        <dl className="ovl io">
          {options.map((r, k) => (
            <div key={r.label} className="ov up" data-lt="" style={{ "--d": `${Math.min(k, 5) * 0.05}s` } as CSSProperties}>
              <i className="nd" data-a="" data-lit="" />
              <dt>{r.label}</dt>
              <dd>
                {r.value}
                {r.note && <small>{r.note}</small>}
              </dd>
            </div>
          ))}
        </dl>
        <p className="nt io">
          <span className="up">※ 表示は税別です。サイトの公開にサーバー代はかかりません。ドメインをお持ちでない場合は、取得・更新の実費（年間2,000〜7,000円程度）が別途かかります。</span>
        </p>
      </section>

      <section className="blk lt" data-th="l" id="flow">
        <i className="an" data-a="" style={{ left: "calc(var(--px) * .5)", top: "150px" }} />
        <SecHead en="Flow" ja="制作の流れ" />
        <div className="fl f6 io">
          {flow.map(([n, en, ja, tx], k) => (
            <div key={n} className="fs up" data-lt="" style={{ "--d": `${(k % 3) * 0.1}s` } as CSSProperties}>
              <div className="fs-h">
                <i className="fs-n" {...(k % 3 === 0 ? { "data-a": "", "data-ax": "-1", "data-lit": "" } : {})}>
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

      <section className="blk dk" data-th="d" id="terms">
        <i className="an" data-a="" style={{ left: "calc(var(--px) * .45)", top: "200px" }} />
        <SecHead en="Terms" ja="ご依頼にあたっての決まり" />
        <dl className="ovl io">
          {terms.map((r, k) => (
            <div key={r.label} className="ov tm up" data-lt="" style={{ "--d": `${Math.min(k, 5) * 0.05}s` } as CSSProperties}>
              <i className="nd" data-a="" data-lit="" />
              <dt>{r.label}</dt>
              <dd>{r.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <WebOrderBody />
    </Shell>
  );
}
