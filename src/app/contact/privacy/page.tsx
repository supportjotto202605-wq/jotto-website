import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SecHead, Shell } from "@/pop/parts";

export const metadata: Metadata = {
  title: "お問い合わせにおける個人情報の取り扱いについて",
  description: "株式会社Jottoのお問い合わせフォームにおける個人情報の取り扱いについて。",
  alternates: { canonical: "/contact/privacy" },
};

export default function Page() {
  return (
    <Shell kind="lower">
      <PageHero
        crumbs={[{ href: "/", label: "トップ" }, { href: "/contact", label: "お問い合わせ" }, { label: "個人情報の取り扱い" }]}
        lines={["Privacy", "Notice"]}
        num="P"
        label="お問い合わせにおける個人情報の取り扱いについて"
      />
      <section className="blk lt" data-th="l">
        <i className="an" data-a="" style={{ left: "calc(var(--px) * .5)", top: "150px" }} />
        <SecHead num="P" en="Privacy notice" ja="個人情報の取り扱い" />
        <div className="pr io">
          <div className="up">
            <h2>1. 取得する情報</h2>
            <p>当社は、お問い合わせフォームを通じて、会社名・氏名・電話番号・メールアドレス・お問い合わせ内容を取得します。応募の場合は、希望職種・応募内容を含むことがあります。</p>
            <h2>2. 利用目的</h2>
            <ul>
              <li>お問い合わせへの回答</li>
              <li>当社サービスのご案内</li>
              <li>採用選考に関する連絡</li>
            </ul>
            <h2>3. 第三者提供</h2>
            <p>取得した個人情報は、法令に基づく場合を除き、本人の同意なく第三者に提供することはありません。</p>
            <h2>4. 委託先・送信方法</h2>
            <p>フォーム内容はメール送信サービス Resend を通じて当社 info@jotto.co.jp に送信されます。同サービスは米国事業者のため、情報が国外で処理される場合があります。</p>
            <h2>5. 保存期間</h2>
            <p>お問い合わせへの対応完了後、必要な期間を経て適切に削除します。</p>
            <h2>6. 開示・訂正・削除のご請求窓口</h2>
            <p>個人情報の開示・訂正・削除をご希望の場合は、下記までお問い合わせください。</p>
            <p>
              メールアドレス：info@jotto.co.jp
              <br />
              個人情報保護管理者：大野一樹
            </p>
            <p className="nt">
              制定日：2026年10月
              <br />
              株式会社Jotto
              <br />
              当社の個人情報保護方針は「<Link href="/privacy">プライバシーポリシー</Link>」をご確認ください。
            </p>
          </div>
        </div>
        <i className="an" data-a="" style={{ left: "calc(var(--px) * .5)", bottom: "70px" }} />
      </section>
    </Shell>
  );
}
