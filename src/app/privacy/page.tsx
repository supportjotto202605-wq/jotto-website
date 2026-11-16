import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SecHead, Shell } from "@/pop/parts";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "株式会社Jottoのプライバシーポリシー(個人情報保護方針)。",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <Shell kind="lower">
      <PageHero crumbs={[{ href: "/", label: "トップ" }, { label: "プライバシーポリシー" }]} lines={["Privacy", "Policy"]} num="P" label="プライバシーポリシー" />
      <section className="blk lt" data-th="l">
        <i className="an" data-a="" style={{ left: "calc(var(--px) * .5)", top: "150px" }} />
        <SecHead num="P" en="Privacy policy" ja="個人情報保護方針" />
        <div className="pr io">
          <div className="up">
            <h2>1. 個人情報の取得について</h2>
            <p>当社は、お問い合わせやサービスのご利用にあたり、氏名・メールアドレス・電話番号等の個人情報を取得します。</p>
            <h2>2. 利用目的</h2>
            <ul>
              <li>お問い合わせへの回答</li>
              <li>当社サービスのご案内</li>
              <li>採用選考に関する連絡</li>
            </ul>
            <h2>3. 第三者への提供</h2>
            <p>取得した個人情報は、法令に基づく場合を除き、第三者に提供することはありません。</p>
            <h2>4. 個人情報の管理</h2>
            <p>取得した個人情報は、適切なセキュリティ対策を講じた上で管理します。</p>
            <h2>5. 開示・訂正・削除について</h2>
            <p>個人情報の開示・訂正・削除をご希望の場合は、下記までお問い合わせください。</p>
            <p>
              株式会社Jotto
              <br />
              メールアドレス：info@jotto.co.jp
            </p>
            <h2>6. 個人情報保護管理者</h2>
            <p>代表取締役　大野一樹</p>
            <p className="nt">
              制定日：2026年6月
              <br />
              株式会社Jotto
              <br />
              お問い合わせフォームにおける個人情報の取り扱いについては「<Link href="/contact/privacy">お問い合わせにおける個人情報の取り扱いについて</Link>」をご確認ください。
            </p>
          </div>
        </div>
        <i className="an" data-a="" style={{ left: "calc(var(--px) * .5)", bottom: "70px" }} />
      </section>
    </Shell>
  );
}
