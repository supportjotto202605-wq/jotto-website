import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Cta, PageHero, SecHead, Shell } from "@/pop/parts";

export const metadata: Metadata = {
  title: "お知らせ",
  description: "株式会社Jottoからのお知らせ。",
  alternates: { canonical: "/news" },
};

/* お知らせを足すときは、この配列の先頭に追加する */
const newsItems: { date: string; category: string; title: string; body: string; href?: string; link?: string }[] = [
  {
    date: "2026 / 11",
    category: "SERVICE",
    title: "ホームページ制作サービスを開始しました",
    body: "打ち合わせ不要、ヒアリングシートに記入するだけで依頼できるホームページ制作サービスを開始いたしました。月額費用のかからない売り切りで、4万円（税別）から承ります。LINE公式アカウント「Jotto ホームページ制作」からもご相談いただけます。",
    href: "/web-production",
    link: "料金・ご依頼の流れを見る",
  },
  {
    date: "2026 / 11",
    category: "NEWS",
    title: "コーポレートサイトをリニューアルしました",
    body: "コーポレートサイトを全面リニューアルいたしました。事業ごとの詳細ページを新設し、お問い合わせフォームもより使いやすくなりました。今後ともよろしくお願いいたします。",
  },
  {
    date: "2026 / 06",
    category: "NEWS",
    title: "株式会社Jotto コーポレートサイトをオープンしました",
    body: "株式会社Jottoのコーポレートサイトを公開いたしました。今後ともよろしくお願いいたします。",
  },
  {
    date: "2026 / 06",
    category: "NEWS",
    title: "株式会社Jotto 設立",
    body: "2026年6月、株式会社Jottoを設立いたしました。",
  },
];

export default function Page() {
  return (
    <Shell kind="lower" cur="news">
      <PageHero crumbs={[{ href: "/", label: "トップ" }, { label: "お知らせ" }]} lines={["News"]} num="04" label="お知らせ" />
      <section className="blk dk" data-th="d">
        <SecHead num="04" en="News" ja="お知らせ一覧" />
        <div className="io">
          {newsItems.map((n, k) => (
            <div key={n.title} className="nw up" data-lt="" style={{ "--d": `${k * 0.08}s` } as CSSProperties}>
              <i className="nd" data-a="" data-lit="" />
              <span className="nw-d">{n.date}</span>
              <span className="nw-g">{n.category}</span>
              <span className="nw-t">
                {n.title}
                <small>{n.body}</small>
                {n.href && (
                  <Link className="nw-l" href={n.href}>
                    {n.link}
                  </Link>
                )}
              </span>
            </div>
          ))}
        </div>
      </section>
      <Cta title="Let’s work together" text="お問い合わせはWebフォームより承っております" label="お問い合わせ" href="/contact" side="l" />
    </Shell>
  );
}
