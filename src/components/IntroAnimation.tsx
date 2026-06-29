"use client";

import { useState, useEffect, useRef } from "react";

const SESSION_KEY = "jotto-intro-seen";

export default function IntroAnimation() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen) { setVisible(false); return; }
    const t1 = setTimeout(() => setFadeOut(true), 1500);
    const t2 = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "true");
      setVisible(false);
    }, 2500);
    return () => [t1, t2].forEach(clearTimeout);
  }, []);

  if (!visible) return null;

  const phase = fadeOut ? "hidden" : "visible";

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center px-6 pt-28"
      style={{
        backgroundColor: "#0a0a0a",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 1s ease",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
      aria-hidden="true"
    >
      <img
        src="/jotto-logo.svg"
        alt="Jotto"
        style={{
          width: "min(80vw, 480px)",
          height: "auto",
          opacity: phase === "hidden" ? 0 : 1,
          transition: "opacity 1s ease",
        }}
      />
    </div>
  );
}
