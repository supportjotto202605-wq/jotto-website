import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#0a0a0a", color: "#f0ede8" }}>
      <section className="min-h-[45vh] flex flex-col items-center justify-center px-6 py-24 pt-32">
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#C0392B" }}>
          PRIVACY
        </p>
        <p className="text-xl md:text-2xl font-extralight tracking-[0.15em] mb-4" style={{ color: "#8a8a8a" }}>
          プライバシーポリシー
        </p>
        <div className="w-64 h-px" style={{ backgroundColor: "#C0392B" }} />
      </section>

      <section className="py-20" style={{ backgroundColor: "#141414" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-10">
          <div>
            <h2 className="text-lg font-light mb-4">1. 個人情報の取得について</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#8a8a8a" }}>
              当社は、お問い合わせやサービスのご利用にあたり、氏名・メールアドレス・電話番号等の個人情報を取得します。
            </p>
          </div>

          <div>
            <h2 className="text-lg font-light mb-4">2. 利用目的</h2>
            <ul className="space-y-2 text-sm" style={{ color: "#8a8a8a" }}>
              <li>・お問い合わせへの回答</li>
              <li>・当社サービスのご案内</li>
              <li>・採用選考に関する連絡</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-light mb-4">3. 第三者への提供</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#8a8a8a" }}>
              取得した個人情報は、法令に基づく場合を除き、第三者に提供することはありません。
            </p>
          </div>

          <div>
            <h2 className="text-lg font-light mb-4">4. 個人情報の管理</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#8a8a8a" }}>
              取得した個人情報は、適切なセキュリティ対策を講じた上で管理します。
            </p>
          </div>

          <div>
            <h2 className="text-lg font-light mb-4">5. 開示・訂正・削除について</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#8a8a8a" }}>
              個人情報の開示・訂正・削除をご希望の場合は、下記までお問い合わせください。
              <br />
              株式会社Jotto
              <br />
              メールアドレス：info@jotto.co.jp
            </p>
          </div>

          <div>
            <h2 className="text-lg font-light mb-4">6. 個人情報保護管理者</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#8a8a8a" }}>
              代表取締役　大野一樹
            </p>
          </div>

          <div className="pt-4 border-t" style={{ borderColor: "#2a2a2a" }}>
            <p className="text-sm leading-relaxed" style={{ color: "#8a8a8a" }}>
              制定日：2026年6月
              <br />
              株式会社Jotto
            </p>
            <p className="text-sm leading-relaxed mt-4" style={{ color: "#8a8a8a" }}>
              お問い合わせフォームにおける個人情報の取り扱いについては「
              <Link href="/contact/privacy" className="underline underline-offset-2" style={{ color: "#f0ede8" }}>
                お問い合わせにおける個人情報の取り扱いについて
              </Link>
              」をご確認ください。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
