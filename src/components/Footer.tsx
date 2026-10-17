import Link from "next/link";
import { LogoLink } from "./Logo";

const legalLinks = [
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/legal", label: "特定商取引法に基づく表記" },
];

export default function Footer() {
  return (
    <footer
      className="site-footer border-t border-[var(--border)]"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="site-footer__main">
        <div className="site-footer__brand-row">
          <LogoLink className="shrink-0 opacity-90 [&_img]:h-8 [&_img]:w-auto" />
          <div className="site-footer__info">
            <p>株式会社Jotto</p>
            <p>〒170-0012 東京都豊島区上池袋3-16-16 フォリスタ上池袋301</p>
            <p>TEL: 070-9099-2980</p>
            <p>Email: info@jotto.co.jp</p>
          </div>
        </div>

        <div className="site-footer__social flex justify-center py-4">
          <a
            href="https://www.instagram.com/jotto202605/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.08em] transition-colors hover:text-[#f0ede8]"
            style={{ color: "#8a8a8a" }}
            aria-label="Instagram"
          >
            Instagram
          </a>
        </div>

        <nav className="site-footer__legal text-center" aria-label="フッターナビゲーション">
          <ul className="flex flex-col items-center gap-3">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-xs transition-colors hover:text-[#f0ede8]" style={{ color: "#8a8a8a" }}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="site-footer__bottom">
        <p className="site-footer__copyright">© 2026 Jotto Inc.</p>
        <p className="text-xs text-center mt-2" style={{ color: "#8a8a8a" }}>
          適格請求書発行事業者登録番号：T5013301056317
        </p>
      </div>
    </footer>
  );
}
