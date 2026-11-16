import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import PopBoot from "./PopBoot";

/* 共通パーツ(ヘッダー・メニュー・フッター・てんとう虫の線)。見た目は globals.css、動きは engineMain.js / engineLower.js */

export function Arw() {
  return (
    <svg aria-hidden="true">
      <use href="#arwu" />
    </svg>
  );
}

function Defs() {
  return (
<svg width="0" height="0" style={{"position": "absolute"} as CSSProperties} aria-hidden="true"><defs><symbol id="jmark" viewBox="0 0 500 300"><g transform="translate(-164.415438,428.365043) scale(0.052241,-0.051736)" fill="#f0ede8"><path d="M6173 8256 l-28 -24 -5 -2134 c-6 -2319 -3 -2185 -60 -2401 -150 -567 -569 -943 -1138 -1021 -596 -83 -1142 157 -1423 626 -86 143 -149 338 -174 540 -12 101 -17 115 -40 135 -36 32 -85 30 -126 -4 l-32 -27 6 -91 c11 -163 66 -370 143 -533 191 -407 592 -706 1089 -812 144 -31 420 -38 575 -16 272 40 467 112 665 244 118 79 304 259 391 377 116 158 221 399 264 608 46 221 45 167 45 2395 l0 2114 -28 24 c-37 32 -87 32 -124 0z" />
<path d="M8653 7500 c-45 -18 -53 -56 -53 -239 l0 -170 -235 -3 c-228 -3 -235 -4 -257 -26 -32 -31 -31 -92 1 -126 l24 -26 234 0 233 0 0 -444 c0 -504 6 -569 64 -685 38 -74 128 -166 197 -201 73 -38 156 -53 259 -47 129 7 207 37 235 90 l20 37 -20 37 c-29 54 -58 61 -147 35 -201 -60 -355 17 -404 200 -11 42 -14 151 -14 516 l0 462 259 0 260 0 20 26 c31 39 28 89 -8 125 l-29 29 -251 0 -251 0 0 184 0 184 -31 26 c-31 27 -66 32 -106 16z" />
<path d="M10423 7500 c-45 -18 -53 -56 -53 -239 l0 -170 -225 -3 c-218 -3 -225 -4 -247 -26 -30 -29 -32 -100 -4 -131 18 -20 28 -21 247 -21 l228 0 4 -492 c3 -418 6 -500 19 -539 64 -185 194 -302 376 -339 41 -9 98 -11 165 -7 205 12 304 78 255 170 -28 53 -52 56 -170 26 -116 -30 -204 -24 -295 22 -46 23 -78 48 -100 77 -62 82 -63 96 -63 614 l0 468 260 0 c246 0 261 1 280 20 43 43 34 112 -19 143 -25 15 -62 17 -275 17 l-246 0 0 181 0 181 -29 29 c-30 30 -65 36 -108 19z" />
<path d="M7592 5249 c-215 -28 -452 -134 -613 -274 -253 -221 -408 -492 -464 -812 -19 -110 -19 -181 0 -308 18 -123 45 -212 94 -320 146 -314 433 -556 802 -674 300 -96 719 -89 1037 18 336 113 580 292 1157 852 l131 126 45 -41 c25 -23 121 -111 215 -196 527 -482 733 -632 1007 -734 206 -77 397 -104 597 -86 221 21 383 74 552 180 476 298 677 860 507 1418 -51 165 -175 375 -295 497 -179 184 -437 313 -686 345 -307 38 -631 -26 -881 -174 -155 -91 -255 -174 -507 -420 -131 -127 -211 -204 -475 -458 l-81 -77 -36 32 c-19 18 -102 93 -184 167 -251 229 -265 242 -417 375 -82 71 -192 162 -245 202 -261 195 -543 320 -807 358 -107 16 -349 18 -453 4z m539 -203 c167 -44 306 -109 479 -223 152 -100 265 -194 628 -519 178 -159 332 -295 341 -303 15 -13 3 -28 -134 -161 -646 -629 -883 -781 -1330 -851 -117 -19 -380 -16 -490 5 -108 21 -262 69 -330 104 -204 102 -408 299 -499 479 -115 230 -133 491 -50 743 29 87 117 249 179 329 102 133 282 280 420 341 161 73 267 91 500 86 163 -4 203 -8 286 -30z m3629 -6 c408 -103 709 -463 761 -911 40 -348 -73 -655 -326 -887 -183 -168 -392 -249 -666 -259 -287 -11 -501 52 -754 222 -133 90 -271 205 -574 480 -73 66 -174 157 -224 202 -50 45 -93 86 -95 91 -3 9 595 589 748 725 130 116 225 182 345 242 203 100 325 127 555 120 104 -2 169 -10 230 -25z" />
</g>
</symbol>
<symbol id="jbug" viewBox="0 0 32 32"><circle cx="16" cy="6" r="4" fill="#1c1c1c" />
<ellipse cx="16" cy="19" rx="10" ry="12" fill="#c0392b" />
<line x1="16" y1="8" x2="16" y2="31" stroke="#0a0a0a" strokeWidth="2" />
<circle cx="11" cy="14" r="2" fill="#0a0a0a" />
<circle cx="10" cy="22" r="2.5" fill="#0a0a0a" />
<circle cx="12" cy="28" r="1.5" fill="#0a0a0a" />
<circle cx="21" cy="14" r="2" fill="#0a0a0a" />
<circle cx="22" cy="22" r="2.5" fill="#0a0a0a" />
<circle cx="20" cy="28" r="1.5" fill="#0a0a0a" />
</symbol>
<symbol id="jbugw" viewBox="0 0 32 32"><circle cx="16" cy="6" r="4" fill="#0a0a0a" />
<ellipse cx="16" cy="19" rx="10" ry="12" fill="#f0ede8" />
<line x1="16" y1="8" x2="16" y2="31" stroke="#0a0a0a" strokeWidth="2" />
<circle cx="11" cy="14" r="2" fill="#0a0a0a" />
<circle cx="10" cy="22" r="2.5" fill="#0a0a0a" />
<circle cx="12" cy="28" r="1.5" fill="#0a0a0a" />
<circle cx="21" cy="14" r="2" fill="#0a0a0a" />
<circle cx="22" cy="22" r="2.5" fill="#0a0a0a" />
<circle cx="20" cy="28" r="1.5" fill="#0a0a0a" />
</symbol>
<symbol id="arwu" viewBox="0 0 24 24"><path d="M6 18L18 6M8 6h10v10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
</symbol>
</defs>
</svg>
  );
}

function Hud({ main, cur }: { main: boolean; cur?: string }) {
  return (
<div className="hud"><i className="pgb"></i>
<svg className="pm" viewBox="0 0 32 32" aria-hidden="true"><use href="#jbug"></use>
</svg>
<header className="hd"><Link className="pill lg" href="/" data-go="top" aria-label="株式会社Jotto トップへ"><svg viewBox="0 0 500 300" width="66" height="40" role="img" aria-label="Jotto"><use href="#jmark"></use>
<g transform="translate(466, 210) rotate(25, 16, 19) scale(0.8)"><use href="#jbug" width="32" height="32"></use>
</g>
</svg>
<span>{"株式会社 Jotto"}</span>
</Link>
<nav className="pill nv" aria-label="メインナビゲーション"><Link className={cur === "company" ? "nl cur" : "nl"} href="/company" data-n="1"><i>{"01"}</i>
{"企業情報"}</Link>
<Link className={cur === "service" ? "nl cur" : "nl"} href="/service" data-n="2"><i>{"02"}</i>
{"事業紹介"}</Link>
<Link className={cur === "recruit" ? "nl cur" : "nl"} href="/recruit" data-n="3"><i>{"03"}</i>
{"採用情報"}</Link>
<Link className={cur === "news" ? "nl cur" : "nl"} href="/news" data-n="4"><i>{"04"}</i>
{"お知らせ"}</Link>
<Link className="go" href="/contact">{"お問い合わせ"}<svg aria-hidden="true"><use href="#arwu"></use>
</svg>
</Link>
<button className="mb" type="button" data-act="menu" aria-label="メニューを開く"><em></em>
</button>
</nav>
</header>
<div className="bt"><span className="pill sh">{"Scroll ↓"}</span>
<span style={{"display": "inline-flex", "gap": "10px"} as CSSProperties}>{main && (
<button className="pill" type="button" data-act="replay">{"Opening replay"}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.6-5.9M20 4v5h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
</svg>
</button>
)}
<button className="pill" type="button" data-act="motion" aria-pressed="true"><span data-mlabel="1">{"Motion on"}</span>
<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
</svg>
</button>
</span>
</div>
</div>
  );
}

function Menu() {
  return (
<div className="mo"><button className="mo-x" type="button" data-act="menu">{"Close ×"}</button>
<div className="mo-g"><div><Link className="m1" href="/" data-go="top"><i>{"00"}</i>
<b>{"Top"}</b>
<span>{"トップ"}</span>
</Link>
<Link className="m1" href="/company"><i>{"01"}</i>
<b>{"Company"}</b>
<span>{"企業情報"}</span>
</Link>
<Link className="m1" href="/service"><i>{"02"}</i>
<b>{"Service"}</b>
<span>{"事業紹介"}</span>
</Link>
<Link className="m1" href="/recruit"><i>{"03"}</i>
<b>{"Recruit"}</b>
<span>{"採用情報"}</span>
</Link>
<Link className="m1" href="/news"><i>{"04"}</i>
<b>{"News"}</b>
<span>{"お知らせ"}</span>
</Link>
<Link className="m1" href="/contact"><i>{"05"}</i>
<b>{"Contact"}</b>
<span>{"お問い合わせ"}</span>
</Link>
</div>
<div><p className="en" style={{"margin": "0 0 12px", "fontSize": "18px", "fontWeight": "600"} as CSSProperties}>{"Our Services"}</p>
<Link className="m2" href="/service/property-management"><i>{"01"}</i>
{"不動産管理事業"}</Link>
<Link className="m2" href="/service/real-estate-consulting"><i>{"02"}</i>
{"不動産コンサル事業"}</Link>
<Link className="m2" href="/service/outsourcing"><i>{"03"}</i>
{"アウトソーシング事業"}</Link>
<Link className="m2" href="/service/product-development"><i>{"04"}</i>
{"プロダクト開発事業"}</Link>
</div>
</div>
</div>
  );
}

function SiteFooter({ lower }: { lower: boolean }) {
  return (
<footer className="ft" data-th="d">{lower && <i className="an ft-an" data-a="" style={{ right: "14%", top: "70px" }} />}
<div className="ft-lg"><svg viewBox="0 0 500 300" role="img" aria-label="Jotto"><use href="#jmark"></use>
<g className="ft-bug" transform="translate(466, 210) rotate(25, 16, 19) scale(0.8)"><use href="#jbug" width="32" height="32"></use>
</g>
</svg>
<i className="land" data-a="land"></i>
</div>
<nav className="ft-n" aria-label="フッターナビゲーション"><Link href="/company">{"企業情報"}</Link>
<Link href="/service">{"事業紹介"}</Link>
<Link href="/recruit">{"採用情報"}</Link>
<Link href="/news">{"お知らせ"}</Link>
<Link href="/contact">{"お問い合わせ"}</Link>
<Link href="/privacy">{"プライバシーポリシー"}</Link>
<Link href="/legal">{"特定商取引法に基づく表記"}</Link>
<a href="https://www.instagram.com/jotto202605/" target="_blank" rel="noopener noreferrer">{"Instagram"}</a>
</nav>
<p className="ft-c en">{"© 2026 Jotto Inc. All rights reserved."}</p>
<p className="ft-i">{"適格請求書発行事業者登録番号：T5013301056317"}</p>
</footer>
  );
}

function Opener() {
  return (
<div className="op" aria-hidden="true"><svg className="ol" viewBox="0 0 500 300"><g transform="translate(-164.415438,428.365043) scale(0.052241,-0.051736)"><path className="jl-ink jl-p1" pathLength="1" d="M6173 8256 l-28 -24 -5 -2134 c-6 -2319 -3 -2185 -60 -2401 -150 -567 -569 -943 -1138 -1021 -596 -83 -1142 157 -1423 626 -86 143 -149 338 -174 540 -12 101 -17 115 -40 135 -36 32 -85 30 -126 -4 l-32 -27 6 -91 c11 -163 66 -370 143 -533 191 -407 592 -706 1089 -812 144 -31 420 -38 575 -16 272 40 467 112 665 244 118 79 304 259 391 377 116 158 221 399 264 608 46 221 45 167 45 2395 l0 2114 -28 24 c-37 32 -87 32 -124 0z" />
<path className="jl-ink jl-p3" pathLength="1" d="M8653 7500 c-45 -18 -53 -56 -53 -239 l0 -170 -235 -3 c-228 -3 -235 -4 -257 -26 -32 -31 -31 -92 1 -126 l24 -26 234 0 233 0 0 -444 c0 -504 6 -569 64 -685 38 -74 128 -166 197 -201 73 -38 156 -53 259 -47 129 7 207 37 235 90 l20 37 -20 37 c-29 54 -58 61 -147 35 -201 -60 -355 17 -404 200 -11 42 -14 151 -14 516 l0 462 259 0 260 0 20 26 c31 39 28 89 -8 125 l-29 29 -251 0 -251 0 0 184 0 184 -31 26 c-31 27 -66 32 -106 16z" />
<path className="jl-ink jl-p4" pathLength="1" d="M10423 7500 c-45 -18 -53 -56 -53 -239 l0 -170 -225 -3 c-218 -3 -225 -4 -247 -26 -30 -29 -32 -100 -4 -131 18 -20 28 -21 247 -21 l228 0 4 -492 c3 -418 6 -500 19 -539 64 -185 194 -302 376 -339 41 -9 98 -11 165 -7 205 12 304 78 255 170 -28 53 -52 56 -170 26 -116 -30 -204 -24 -295 22 -46 23 -78 48 -100 77 -62 82 -63 96 -63 614 l0 468 260 0 c246 0 261 1 280 20 43 43 34 112 -19 143 -25 15 -62 17 -275 17 l-246 0 0 181 0 181 -29 29 c-30 30 -65 36 -108 19z" />
<path className="jl-ink jl-p2" pathLength="1" d="M7592 5249 c-215 -28 -452 -134 -613 -274 -253 -221 -408 -492 -464 -812 -19 -110 -19 -181 0 -308 18 -123 45 -212 94 -320 146 -314 433 -556 802 -674 300 -96 719 -89 1037 18 336 113 580 292 1157 852 l131 126 45 -41 c25 -23 121 -111 215 -196 527 -482 733 -632 1007 -734 206 -77 397 -104 597 -86 221 21 383 74 552 180 476 298 677 860 507 1418 -51 165 -175 375 -295 497 -179 184 -437 313 -686 345 -307 38 -631 -26 -881 -174 -155 -91 -255 -174 -507 -420 -131 -127 -211 -204 -475 -458 l-81 -77 -36 32 c-19 18 -102 93 -184 167 -251 229 -265 242 -417 375 -82 71 -192 162 -245 202 -261 195 -543 320 -807 358 -107 16 -349 18 -453 4z m539 -203 c167 -44 306 -109 479 -223 152 -100 265 -194 628 -519 178 -159 332 -295 341 -303 15 -13 3 -28 -134 -161 -646 -629 -883 -781 -1330 -851 -117 -19 -380 -16 -490 5 -108 21 -262 69 -330 104 -204 102 -408 299 -499 479 -115 230 -133 491 -50 743 29 87 117 249 179 329 102 133 282 280 420 341 161 73 267 91 500 86 163 -4 203 -8 286 -30z m3629 -6 c408 -103 709 -463 761 -911 40 -348 -73 -655 -326 -887 -183 -168 -392 -249 -666 -259 -287 -11 -501 52 -754 222 -133 90 -271 205 -574 480 -73 66 -174 157 -224 202 -50 45 -93 86 -95 91 -3 9 595 589 748 725 130 116 225 182 345 242 203 100 325 127 555 120 104 -2 169 -10 230 -25z" />
</g>
<g className="jl-bug"><g transform="translate(466, 210) rotate(25, 16, 19) scale(0.8)"><g className="jl-wings"><g transform="rotate(-35 2 17)"><ellipse className="jl-wing jl-wingL" cx="2" cy="17" rx="10" ry="4.5" fill="#fff" />
</g>
<g transform="rotate(35 30 17)"><ellipse className="jl-wing jl-wingR" cx="30" cy="17" rx="10" ry="4.5" fill="#fff" />
</g>
</g>
<circle cx="16" cy="6" r="4" fill="#1c1c1c" />
<ellipse cx="16" cy="19" rx="10" ry="12" fill="#c0392b" />
<line x1="16" y1="8" x2="16" y2="31" stroke="#0a0a0a" strokeWidth="2" />
<circle cx="11" cy="14" r="2" fill="#0a0a0a" />
<circle cx="10" cy="22" r="2.5" fill="#0a0a0a" />
<circle cx="12" cy="28" r="1.5" fill="#0a0a0a" />
<circle cx="21" cy="14" r="2" fill="#0a0a0a" />
<circle cx="22" cy="22" r="2.5" fill="#0a0a0a" />
<circle cx="20" cy="28" r="1.5" fill="#0a0a0a" />
</g>
</g>
</svg>
<div className="op-b"><span>{"株式会社 Jotto"}</span>
<span className="op-n" data-count="1">{"100"}</span>
</div>
<i className="op-l"></i>
</div>
  );
}

function LineSvg() {
  return (
<svg className="ln" aria-hidden="true"><defs><mask id="lm-pop" maskUnits="userSpaceOnUse"><path className="ln-m" fill="none" stroke="#fff" strokeWidth="18" strokeLinecap="round" />
</mask>
<clipPath id="rz-pop" clipPathUnits="userSpaceOnUse"></clipPath>
</defs>
<path className="ln-p" fill="none" stroke="none" />
<g mask="url(#lm-pop)"><path className="ln-d" fill="none" stroke="#c0392b" strokeWidth="4" strokeLinecap="round" strokeDasharray=".1 11" />
</g>
<path className="ln-t" fill="none" stroke="#c0392b" strokeWidth="4.5" strokeLinecap="round" />
<g clipPath="url(#rz-pop)"><g mask="url(#lm-pop)"><path className="ln-d" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeDasharray=".1 11" />
</g>
<path className="ln-t" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" />
</g>
<g className="ln-b"><use href="#jbug" x="-17" y="-19" width="34" height="34"></use>
</g>
</svg>
  );
}

export function BigBug() {
  return (
<svg className="ph-bug" viewBox="-6 -8 44 44" aria-hidden="true"><circle cx="16" cy="6" r="4.6" fill="#2a2a2a" />
<ellipse cx="16" cy="19" rx="11" ry="12.6" fill="#c0392b" />
<line x1="16" y1="7" x2="16" y2="31.6" stroke="#0a0a0a" strokeWidth="1" />
<circle cx="10.6" cy="13.6" r="2.1" fill="#0a0a0a" />
<circle cx="9.4" cy="21.6" r="2.7" fill="#0a0a0a" />
<circle cx="12" cy="28" r="1.6" fill="#0a0a0a" />
<circle cx="21.4" cy="13.6" r="2.1" fill="#0a0a0a" />
<circle cx="22.6" cy="21.6" r="2.7" fill="#0a0a0a" />
<circle cx="20" cy="28" r="1.6" fill="#0a0a0a" />
</svg>

  );
}

export function Shell({ kind, cur, children }: { kind: "main" | "lower"; cur?: string; children: ReactNode }) {
  const main = kind === "main";
  return (
    <div className={main ? "app" : "app lw"}>
      <Defs />
      <div className="sc">
        <div className="doc">
          {children}
          <SiteFooter lower={!main} />
          {!main && <LineSvg />}
        </div>
      </div>
      {main && <canvas className="fx" aria-hidden="true" />}
      <Hud main={main} cur={cur} />
      <Menu />
      {main && <Opener />}
      <PopBoot kind={kind} />
    </div>
  );
}

export type Crumb = { href?: string; label: string };

export function PageHero({ crumbs, lines, num, label, children }: { crumbs: Crumb[]; lines: string[]; num: string; label: string; children?: ReactNode }) {
  return (
    <section className="ph" id="top" data-th="d">
      <div className="dots" aria-hidden="true" />
      <i className="ring1" aria-hidden="true" />
      {children ?? (
        <>
          <span className="ph-n" aria-hidden="true">{num}</span>
          <BigBug />
        </>
      )}
      <nav aria-label="パンくずリスト">
        <ol className="bc fd" style={{ animationDelay: ".05s" }}>
          {crumbs.map((c) => (
            <li key={c.label}>{c.href ? <Link href={c.href}>{c.label}</Link> : <b aria-current="page">{c.label}</b>}</li>
          ))}
        </ol>
      </nav>
      <h1 className="ph-t en">
        {lines.map((l, i) => (
          <span key={l} className={`hl d${i + 1}`}>
            <span>
              {l}
              {i === lines.length - 1 && <span className="red">.</span>}
            </span>
          </span>
        ))}
      </h1>
      <p className="ph-j fd" style={{ animationDelay: ".55s" }}>
        <i data-a="" data-ay="1.12">{num}</i>
        {label}
      </p>
    </section>
  );
}

export function Cta({ title, text, label, href, side = "r" }: { title: string; text: string; label: string; href: string; side?: "l" | "r" }) {
  return (
    <section className="blk rd ct" data-th="r">
      {side === "r" ? (
        <i className="an" data-a="" style={{ right: "calc(var(--px) * .5)", top: "52%" }} />
      ) : (
        <i className="an" data-a="" style={{ left: "calc(var(--px) * .7)", top: "56%" }} />
      )}
      <div className="io">
        <h2 className="ct-h en up">
          {title}
          <span style={{ color: "#0a0a0a" }}>.</span>
        </h2>
        <p className="bd up" style={{ "--d": ".12s", margin: 0, fontSize: "18px", letterSpacing: ".12em" } as CSSProperties}>{text}</p>
        <div className="pp" style={{ "--d": ".25s" } as CSSProperties}>
          {side === "r" ? (
            <Link className="cta" data-a="" data-ax=".99" data-lit="" href={href}>
              <Arw />
              {label}
            </Link>
          ) : (
            <Link className="cta" data-a="" data-ay="1.07" data-lit="" href={href}>
              <Arw />
              {label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export function SecHead({ num, en, ja }: { num: string; en: string; ja: string }) {
  return (
    <div className="shd io">
      <i className="nb pp">{num}</i>
      <b className="up">{en}</b>
      <span className="up">{ja}</span>
    </div>
  );
}
