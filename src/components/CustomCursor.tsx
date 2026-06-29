"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (prefersReduced || !finePointer) return;

    document.body.classList.add("custom-cursor-active");

    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      dot.style.left = `${pos.current.x}px`;
      dot.style.top = `${pos.current.y}px`;
      dot.querySelector("svg")?.setAttribute("width", "100%");
      dot.querySelector("svg")?.setAttribute("height", "100%");
      rafId.current = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, .btn, .nav-contact-btn, [role='button']");
      const link = t.closest("a");
      dot.classList.toggle("is-hover", Boolean(interactive));
      dot.classList.toggle("is-link", Boolean(link));
    };

    const onEnter = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseenter", onEnter, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId.current);
    };
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      ref={dotRef}
      className="custom-cursor"
      aria-hidden="true"
      dangerouslySetInnerHTML={{
        __html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="6" r="4" fill="#000000"/>
        <path d="M14 3L12 2" stroke="#C0392B" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M18 3L20 2" stroke="#C0392B" stroke-width="1.5" stroke-linecap="round"/>
        <ellipse cx="16" cy="19" rx="10" ry="12" fill="#C0392B"/>
        <line x1="16" y1="8" x2="16" y2="31" stroke="#000000" stroke-width="2"/>
        <circle cx="11" cy="14" r="2" fill="#000000"/>
        <circle cx="10" cy="22" r="2.5" fill="#000000"/>
        <circle cx="12" cy="28" r="1.5" fill="#000000"/>
        <circle cx="21" cy="14" r="2" fill="#000000"/>
        <circle cx="22" cy="22" r="2.5" fill="#000000"/>
        <circle cx="20" cy="28" r="1.5" fill="#000000"/>
      </svg>`,
      }}
    />
  );
}
