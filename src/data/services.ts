export type Service = {

  num: string;

  en: string;

  title: string;

  desc: string;

  details: string[];

  image: string;

};



export const services: Service[] = [

  {

    num: "01",

    en: "PROPERTY MANAGEMENT",

    title: "不動産管理事業",

    desc: "賃貸物件の管理・運営からオーナー様のサポートまで、不動産に関するあらゆるニーズにお応えします。",

    details: [

      "賃貸物件の入居者募集・契約管理",

      "建物メンテナンス・修繕対応",

      "家賃収納代行・滞納管理",

      "オーナー様への定期報告・相談対応",

    ],

    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",

  },

  {

    num: "02",

    en: "REAL ESTATE CONSULTING",

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

    num: "03",

    en: "OUTSOURCING",

    title: "アウトソーシング事業",

    desc: "業務効率化を実現するアウトソーシングサービス。コア業務に集中できる環境を提供します。",

    details: [

      "経理・会計業務代行",

      "人事・労務管理サポート",

      "カスタマーサポート代行",

      "データ入力・事務作業代行",

    ],

    image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80",

  },

  {

    num: "04",

    en: "PRODUCT DEVELOPMENT",

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

  "不動産管理業・不動産コンサル事業・アウトソーシング事業・IT事業（アプリ開発等）";



export const aboutImage =

  "/About Jotto.png";



export const recruitImage =

  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200";


