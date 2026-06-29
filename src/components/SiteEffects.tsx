"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const revealSelectors = [".reveal", ".reveal-left", ".reveal-right"];
    const revealTargets = document.querySelectorAll(revealSelectors.join(","));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );

    revealTargets.forEach((el) => revealObserver.observe(el));

    const parallaxWraps = document.querySelectorAll<HTMLElement>("[data-parallax-wrap]");
    const parallaxState: { el: HTMLElement; inner: HTMLElement }[] = [];

    parallaxWraps.forEach((wrap) => {
      const inner = wrap.querySelector<HTMLElement>("[data-parallax-inner]");
      if (inner) parallaxState.push({ el: wrap, inner });
    });

    let parallaxRaf = 0;
    const updateParallax = () => {
      const vh = window.innerHeight;
      parallaxState.forEach(({ el, inner }) => {
        const rect = el.getBoundingClientRect();
        const progress = (vh - rect.top) / (vh + rect.height);
        const clamped = Math.max(0, Math.min(1, progress));
        const y = (clamped - 0.5) * 40;
        inner.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };

    const onScrollParallax = () => {
      cancelAnimationFrame(parallaxRaf);
      parallaxRaf = requestAnimationFrame(updateParallax);
    };

    if (parallaxState.length > 0) {
      window.addEventListener("scroll", onScrollParallax, { passive: true });
      window.addEventListener("resize", onScrollParallax, { passive: true });
      updateParallax();
    }

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", onScrollParallax);
      window.removeEventListener("resize", onScrollParallax);
      cancelAnimationFrame(parallaxRaf);
    };
  }, [pathname]);

  return null;
}
