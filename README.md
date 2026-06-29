# 株式会社Jotto コーポレートサイト

Next.js（App Router）で構築した株式会社Jottoのコーポレートサイトです。

## ページ構成

- `/` — トップページ
- `/company` — 企業情報
- `/service` — 事業紹介
- `/recruit` — 採用情報
- `/news` — お知らせ

## 開発

```bash
npm install
npm run dev
```

http://localhost:3000 で確認できます。

## Vercel へのデプロイ

1. [Vercel](https://vercel.com) にログイン
2. 「Add New Project」からこのリポジトリをインポート
3. Framework Preset: **Next.js**（自動検出）
4. Deploy

または Vercel CLI:

```bash
npm i -g vercel
vercel
```

## 技術スタック

- Next.js 15（App Router）
- TypeScript
- Tailwind CSS 4
- Google Fonts（Cormorant Garamond + Noto Sans JP）

## ロゴ表示

`public/jotto-logo.png` を `mix-blend-mode: screen` で表示し、黒背景を透過させています。

## イントロアニメーション

トップページ初回訪問時のみ、全画面オーバーレイでロゴ表示 → てんとう虫アニメーション → フェードアウトが再生されます。`sessionStorage` の `jotto-intro-seen` で2回目以降はスキップされます。
