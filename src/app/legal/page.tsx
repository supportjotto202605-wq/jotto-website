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
  { label: "サービス名", value: "ホームページ制作" },
  { label: "販売価格", value: "ライト 40,000円（税込44,000円）／スタンダード 90,000円（税込99,000円）／プレミアム 200,000円（税込220,000円）。追加オプションの料金は、ホームページ制作のページに記載しています。" },
  { label: "商品代金以外の費用", value: "銀行振込の手数料、ドメインの取得・更新費用、メールサービスの利用料（いずれも実費、該当する場合のみ）" },
  { label: "支払方法", value: "銀行振込" },
  { label: "支払時期", value: "制作の開始時に料金の50%、公開前に残りの50%をお支払いいただきます。" },
  { label: "引き渡し時期", value: "着手金のご入金と素材のご提出後、約2〜5週間（プランにより異なります）" },
  { label: "キャンセル・返金", value: "制作開始後のキャンセルは、着手金の返金ができません。制作物の性質上、納品後の返品はお受けできません。公開から30日間は、不具合の修正を無料で行います。" },
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
