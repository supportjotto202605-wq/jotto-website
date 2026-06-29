"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoLink } from "./Logo";

const navItems = [
  { href: "/company", label: "企業情報" },
  { href: "/service", label: "事業紹介" },
  { href: "/recruit", label: "採用情報" },
  { href: "/news", label: "お知らせ" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-[100] ${scrolled ? "is-scrolled" : ""}`}
      style={{
        backgroundColor: scrolled ? "#0a0a0a" : undefined,
      }}
    >
      <div className="flex w-full items-center">
        <div className="mt-2 mr-12 shrink-0 lg:mr-20" style={{ marginLeft: "32px" }}>
          <LogoLink />
        </div>

        <div className="hidden flex-1 items-center justify-end gap-10 pr-8 md:pr-12 lg:pr-16 md:flex">
          <nav className="nav-links" aria-label="メインナビゲーション">
            <ul className="flex items-center gap-9">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={pathname === item.href ? "opacity-100" : "opacity-70"}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link href="/contact" className="nav-contact-btn shrink-0">
            お問い合わせ
          </Link>
        </div>

        <button
          type="button"
          className="ml-auto flex flex-col gap-1.5 md:hidden"
          aria-label="メニューを開く"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="block h-px w-6 bg-[var(--text)]" />
          <span className="block h-px w-6 bg-[var(--text)]" />
          <span className="block h-px w-4 bg-[var(--text)]" />
        </button>
      </div>

      {menuOpen && (
        <div className="mt-6 border-t border-[var(--border)] pt-6 md:hidden">
          <ul className="flex flex-col gap-5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-links opacity-80">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="nav-contact-btn inline-flex">
                お問い合わせ
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
