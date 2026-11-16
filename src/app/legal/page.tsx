import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { PageHero, SecHead, Shell } from "@/pop/parts";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  alternates: { canonical: "/legal" },
};

const items = [
  { label: "販売業者", value: "株式会社Jotto" },
  { label: "代表者", value: "大野一樹" },
  { label: "所在地", value: "〒170-0012 東京都豊島区上池袋3-16-16 フォリスタ上池袋301" },
  { label: "電話番号", value: "請求があった場合、遅滞なく開示いたします。" },
  { label: "メールアドレス", value: "info@jotto.co.jp" },
  { label: "サービス名", value: "禁煙ペイ" },
  { label: "サービス内容", value: "禁煙の誓約と自動課金を組み合わせた禁煙サポートサービス" },
  { label: "料金", value: "違反申告が承認された場合、事前に設定した金額を自動課金（Stripe決済）" },
  { label: "支払方法", value: "クレジットカード（Stripe経由）" },
  { label: "返金について", value: "サービスの性質上、原則として返金はお受けできません。ただし、システム障害等による誤課金の場合はこの限りではありません。" },
  { label: "サービス提供時期", value: "決済完了後、即時" },
  { label: "動作環境", value: "インターネット接続環境が必要です" },
];

export default function Page() {
  return (
    <Shell kind="lower">
      <PageHero crumbs={[{ href: "/", label: "トップ" }, { label: "特定商取引法に基づく表記" }]} lines={["Legal"]} num="L" label="特定商取引法に基づく表記" />
      <section className="blk dk" data-th="d">
        <SecHead num="L" en="Legal notice" ja="特定商取引法に基づく表記" />
        <dl className="ovl io">
          {items.map((r, k) => (
            <div key={r.label} className="ov up" data-lt="" style={{ "--d": `${Math.min(k, 5) * 0.05}s` } as CSSProperties}>
              <i className="nd" data-a="" data-lit="" />
              <dt>{r.label}</dt>
              <dd>{r.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </Shell>
  );
}
