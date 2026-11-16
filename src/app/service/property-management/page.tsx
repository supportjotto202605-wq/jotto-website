import { permanentRedirect } from "next/navigation";

/* 不動産管理事業のページは廃止。事業紹介へ転送する(next.config.ts にも同じ転送あり) */
export default function Page() {
  permanentRedirect("/service");
}
