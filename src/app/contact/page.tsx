import type { Metadata } from "next";
import ContactBody from "@/pop/ContactBody";
import { PageHero, Shell } from "@/pop/parts";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "株式会社Jottoへのお問い合わせはこちらのフォームより承っております。",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <Shell kind="lower">
      <PageHero crumbs={[{ href: "/", label: "トップ" }, { label: "お問い合わせ" }]} lines={["Contact"]} num="05" label="お問い合わせ" />
      <ContactBody />
    </Shell>
  );
}
