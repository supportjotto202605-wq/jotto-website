import Image from "next/image";
import type { Metadata } from "next";
import HeroSection from "./HeroSection";
import VisionSection from "./VisionSection";

export const metadata: Metadata = {
  title: "企業情報",
};

function MessageSection() {
  return (
    <section className="bg-[#141414] py-28 lg:py-36">
      <div className="mx-auto w-full max-w-[1200px] px-8 lg:px-16">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[16/9] overflow-hidden self-start mt-[54px]">
            <Image
              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80"
              alt="CEO Portrait"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale"
            />
          </div>

          <div className="lg:pt-2">
            <p className="font-en mb-8 text-[11px] uppercase tracking-[0.35em] text-[#C0392B]">
              CEO Message
            </p>
            <h2 className="text-xl md:text-2xl font-extralight text-[#f0ede8] mb-8 leading-relaxed">
              可能性をビジネスに
              <br />
              共に活躍を拡げられる環境を生み出す
            </h2>
            <div className="space-y-5 text-[#8a8a8a] font-light leading-relaxed text-[14px]">
              <p>株式会社Jottoは、不動産・テクノロジー・アウトソーシングの三領域を融合し、お客様のビジネス基盤ごと支えるパートナーです。</p>
              <p>私たちが大切にしているのは、各分野の専門家が持つ知見を掛け合わせ、一社一社のビジネス課題に対して最適なソリューションを提供することです。</p>
              <p>変化の激しい時代だからこそ、柔軟かつ迅速に動ける組織でありながら、長期的な信頼関係を築くことを使命としています。</p>
            </div>
            <div className="mt-12 border-t border-[#2a2a2a] pt-8">
              <p className="text-ja text-base font-normal text-[#f0ede8]">大野一樹</p>
              <p className="text-ja mt-1 text-sm font-light text-[#8a8a8a]">代表取締役</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfileSection() {
  const profileData = [
    { label: "COMPANY NAME", value: "株式会社Jotto", valueSub: "Jotto Inc." },
    { label: "ADDRESS", value: "〒170-0012\n東京都豊島区上池袋3-16-16 フォリスタ上池袋301", valueSub: "" },
    { label: "ESTABLISHED", value: "2026年5月", valueSub: "" },
    { label: "CEO", value: "大野一樹", valueSub: "Kazuki Ono" },
    { label: "CAPITAL", value: "880,000円", valueSub: "" },
    { label: "BUSINESS", value: "不動産事業・テクノロジー事業・アウトソーシング事業・プロダクト開発事業", valueSub: "" },
    { label: "INVOICE NUMBER", value: "取得中", valueSub: "" },
  ];

  return (
    <section className="bg-[#141414] pb-32 pt-28 lg:pb-40 lg:pt-36">
      <div className="mx-auto w-full max-w-[1200px] px-8 lg:px-16">
        <div className="mb-20 text-center lg:mb-24">
          <p className="font-en mb-5 text-[11px] uppercase tracking-[0.35em] text-[#C0392B]">
            Company Profile
          </p>
          <h2 className="text-ja text-[clamp(1.75rem,3.5vw,3rem)] font-extralight tracking-wide text-[#f0ede8]">
            会社概要
          </h2>
        </div>

        <dl className="border-t border-[#2a2a2a]">
          {profileData.map((item) => (
            <div
              key={item.label}
              className="grid items-start gap-6 border-b border-[#2a2a2a] py-4 md:grid-cols-[240px_1fr] md:gap-12"
            >
              <dt className="font-en pt-1 text-[11px] uppercase tracking-[0.22em] text-[#8a8a8a]">
                {item.label}
              </dt>
              <dd>
                <div>
                  <p className="whitespace-pre-line font-light" style={{ color: "#f0ede8" }}>
                    {item.value}
                  </p>
                  {item.valueSub && (
                    <p className="mt-1 text-sm" style={{ color: "#8a8a8a" }}>
                      {item.valueSub}
                    </p>
                  )}
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0ede8]">
      <HeroSection />
      <MessageSection />
      <VisionSection />
      <ProfileSection />
    </div>
  );
}
