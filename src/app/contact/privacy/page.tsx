import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "お問い合わせにおける個人情報の取り扱いについて",
};

export default function ContactPrivacyPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#0a0a0a", color: "#f0ede8" }}>
      <section className="min-h-[45vh] flex flex-col items-center justify-center px-6 py-24 pt-32">
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#C0392B" }}>
          PRIVACY
        </p>
        <p className="text-xl md:text-2xl font-extralight tracking-[0.15em] mb-4 text-center" style={{ color: "#8a8a8a" }}>
          お問い合わせにおける個人情報の取り扱いについて
        </p>
        <div className="w-64 h-px" style={{ backgroundColor: "#C0392B" }} />
      </section>

      <section className="py-20" style={{ backgroundColor: "#141414" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-10">
          <div>
            <h2 className="text-lg font-light mb-4">1. 取得する情報</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#8a8a8a" }}>
              当社は、お問い合わせフォームを通じて、会社名・氏名・電話番号・メールアドレス・お問い合わせ内容を取得します。応募の場合は、希望職種・応募内容を含むことがあります。
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
            <h2 className="text-lg font-light mb-4">3. 第三者提供</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#8a8a8a" }}>
              取得した個人情報は、法令に基づく場合を除き、本人の同意なく第三者に提供することはありません。
            </p>
          </div>

          <div>
            <h2 className="text-lg font-light mb-4">4. 委託先・送信方法</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#8a8a8a" }}>
              フォーム内容はメール送信サービス Resend を通じて当社 info@jotto.co.jp に送信されます。同サービスは米国事業者のため、情報が国外で処理される場合があります。
            </p>
          </div>

          <div>
            <h2 className="text-lg font-light mb-4">5. 保存期間</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#8a8a8a" }}>
              お問い合わせへの対応完了後、必要な期間を経て適切に削除します。
            </p>
          </div>

          <div>
            <h2 className="text-lg font-light mb-4">6. 開示・訂正・削除のご請求窓口</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#8a8a8a" }}>
              個人情報の開示・訂正・削除をご希望の場合は、下記までお問い合わせください。
              <br />
              メールアドレス：info@jotto.co.jp
              <br />
              個人情報保護管理者：大野一樹
            </p>
          </div>

          <div className="pt-4 border-t" style={{ borderColor: "#2a2a2a" }}>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#8a8a8a" }}>
              制定日：2026年10月
              <br />
              株式会社Jotto
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#8a8a8a" }}>
              当社の個人情報保護方針は「
              <Link href="/privacy" className="underline underline-offset-2" style={{ color: "#f0ede8" }}>
                プライバシーポリシー
              </Link>
              」をご確認ください。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
