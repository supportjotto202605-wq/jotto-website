"use client";

import { useEffect, useRef } from "react";
import { bootMain } from "./engineMain";
import { bootLower } from "./engineLower";

/* ページの動き(線・てんとう虫・メニューなど)を起動する */
export default function PopBoot({ kind }: { kind: "main" | "lower" }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = ref.current?.closest(".app");
    if (!root) return;
    const off = kind === "main" ? bootMain(root) : bootLower(root);
    return () => {
      if (typeof off === "function") off();
    };
  }, [kind]);
  return <span ref={ref} hidden />;
}
