export type Service = {
  num: string;
  en: string;
  title: string;
  desc: string;
  details: string[];
  image: string;
  slug: string;
  enLines: string[];
  head: string[];
  art: number;
};

export const services: Service[] = [
  {
    num: "01",
    art: 2,
    en: "REAL ESTATE CONSULTING",
    slug: "real-estate-consulting",
    enLines: ["Real Estate", "Consulting"],
    head: ["専門知識を活かした", "コンサルティングを。"],
    title: "不動産コンサル事業",
    desc: "不動産投資、資産運用から開発プロジェクトまで、専門知識を活かしたコンサルティングを提供します。",
    details: [
      "不動産投資戦略の立案",
      "資産運用・ポートフォリオ構築",
      "不動産開発プロジェクト支援",
      "市場調査・デューデリジェンス",
    ],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
  },
  {
    num: "02",
    art: 3,
    en: "OUTSOURCING",
    slug: "outsourcing",
    enLines: ["Outsourcing"],
    head: ["コア業務に", "集中できる環境を。"],
    title: "アウトソーシング事業",
    desc: "店頭での接客・販売支援から事務・サポート業務まで対応するアウトソーシングサービス。コア業務に集中できる環境を提供します。",
    details: [
      "接客・販売支援",
      "経理・会計業務サポート",
      "人事・労務管理サポート",
      "データ入力・事務作業代行",
    ],
    image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80",
  },
  {
    num: "03",
    art: 4,
    en: "PRODUCT DEVELOPMENT",
    slug: "product-development",
    enLines: ["Product", "Development"],
    head: ["アイデアを", "プロダクトに。"],
    title: "プロダクト開発事業",
    desc: "アイデアをプロダクトに。WebアプリからモバイルアプリまでJottoが一気通貫で開発・運用をサポートします。",
    details: [
      "Webアプリケーション開発",
      "モバイルアプリ開発（iOS/Android）",
      "業務システム構築・カスタマイズ",
      "DX推進コンサルティング",
    ],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
  },
];

export const businessSummary =
  "不動産コンサル事業・アウトソーシング事業・プロダクト開発事業";

export const aboutImage =
  "/about-jotto.png";

export const recruitImage =
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200";

