import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
};

export default function LegalPage() {
  const rows = [
    { label: "販売業者", value: "株式会社Jotto" },
    { label: "代表者", value: "大野一樹" },
    { label: "所在地", value: "〒170-0012 東京都豊島区上池袋3-16-16 フォリスタ上池袋301" },
    { label: "電話番号", value: "090-0000-0000（取得中）" },
    { label: "メールアドレス", value: "（取得中）" },
    { label: "サービス名", value: "禁煙ペイ" },
    { label: "サービス内容", value: "禁煙の誓約と自動課金を組み合わせた禁煙サポートサービス" },
    { label: "料金", value: "違反申告が承認された場合、事前に設定した金額を自動課金（Stripe決済）" },
    { label: "支払方法", value: "クレジットカード（Stripe経由）" },
    {
      label: "返金について",
      value:
        "サービスの性質上、原則として返金はお受けできません。ただし、システム障害等による誤課金の場合はこの限りではありません。",
    },
    { label: "サービス提供時期", value: "決済完了後、即時" },
    { label: "動作環境", value: "インターネット接続環境が必要です" },
  ];

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#0a0a0a", color: "#f0ede8" }}>
      <section className="min-h-[45vh] flex flex-col items-center justify-center px-6 py-24 pt-32">
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#C0392B" }}>
          LEGAL
        </p>
        <p className="text-xl md:text-2xl font-extralight tracking-[0.15em] mb-4" style={{ color: "#8a8a8a" }}>
          特定商取引法に基づく表記
        </p>
        <div className="w-64 h-px" style={{ backgroundColor: "#C0392B" }} />
      </section>

      <section className="py-20" style={{ backgroundColor: "#141414" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="border-t border-[#2a2a2a]">
            {rows.map((row) => (
              <div key={row.label} className="grid gap-4 border-b border-[#2a2a2a] py-4 md:grid-cols-[220px_1fr] md:gap-10">
                <p className="text-xs uppercase tracking-[0.1em]" style={{ color: "#8a8a8a" }}>
                  {row.label}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#f0ede8" }}>
                  {row.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
