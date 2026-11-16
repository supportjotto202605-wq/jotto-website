import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

/* ---- 迷惑送信対策 ----
   1. 自サイト以外からの送信を拒否(Origin の確認)
   2. フォームを開いたときに発行する署名つきトークンを必須にする(発行から3秒未満・2時間超は拒否)
   3. 人には見えない入力欄(ハニーポット)に値があればボットとみなす
   4. 同じ接続元からの連続送信を制限(10分で5回まで。サーバーの都合でリセットされることがある簡易版)
   5. 受け付ける項目と文字数を限定
   6. Cloudflare Turnstile のボット判定(環境変数 TURNSTILE_SECRET_KEY があるときだけ有効) */

const ALLOWED_ORIGINS = ["https://jotto.co.jp", "https://www.jotto.co.jp"];
const ALLOWED_KEYS = ["お問い合わせの種類", "ご相談の事業", "企業名", "お名前", "フリガナ", "メールアドレス", "電話番号", "希望職種", "お問い合わせ内容"];
const MODES = ["partner", "apply", "general"];
/* ホームページ制作のヒアリングシート(form: "web")で受け付ける項目 */
const WEB_KEYS = ["ご希望のプラン", "追加オプション", "会社名・屋号", "お名前", "メールアドレス", "事業の内容", "ホームページの目的", "素材のご用意", "載せたいページと内容", "参考にしたいサイト", "希望する雰囲気・色", "ドメイン", "公開の希望時期", "その他のご要望"];
const WEB_REQUIRED = ["ご希望のプラン", "会社名・屋号", "お名前", "事業の内容", "ホームページの目的", "素材のご用意", "載せたいページと内容", "ドメイン"];
const LONG_KEYS = ["お問い合わせ内容", "事業の内容", "載せたいページと内容", "参考にしたいサイト", "その他のご要望"];
const MIN_AGE_MS = 3000;
const MAX_AGE_MS = 2 * 60 * 60 * 1000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

const isEmail = (v: unknown): v is string => typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254;

function originOk(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  return process.env.NODE_ENV !== "production" && /^http:\/\/localhost(:\d+)?$/.test(origin);
}

async function sign(value: string) {
  const secret = process.env.RESEND_API_KEY || "dev-secret";
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`contact:${value}`));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

function sameString(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function limited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX_PER_WINDOW) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return false;
}

async function turnstileOk(token: unknown, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // 未設定のあいだは判定しない
  if (typeof token !== "string" || !token || token.length > 2048) return false;
  try {
    const form = new URLSearchParams({ secret, response: token });
    if (ip !== "unknown") form.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
    const json = (await res.json()) as { success?: boolean };
    return json.success === true;
  } catch (e) {
    console.error("Turnstile verify error:", e);
    return false;
  }
}

const reject = (status: number) => NextResponse.json({ success: false, error: "送信に失敗しました" }, { status, headers: { "Cache-Control": "no-store" } });

/* フォームを開いたときに呼ばれ、送信用のトークンを返す */
export async function GET() {
  const ts = String(Date.now());
  return NextResponse.json({ token: `${ts}.${await sign(ts)}` }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  try {
    if (!originOk(request)) return reject(403);
    if (!(request.headers.get("content-type") || "").includes("application/json")) return reject(415);

    const raw = await request.text();
    if (raw.length > 20000) return reject(413);
    const body = JSON.parse(raw) as { form?: unknown; mode?: unknown; data?: unknown; token?: unknown; website?: unknown; turnstile?: unknown };

    // ハニーポット:値が入っていたら、成功したように見せて何もしない
    if (typeof body.website === "string" && body.website !== "") {
      return NextResponse.json({ success: true });
    }

    const [ts, sig] = typeof body.token === "string" ? body.token.split(".") : [];
    const age = Date.now() - Number(ts);
    if (!ts || !sig || !Number.isFinite(age) || age < MIN_AGE_MS || age > MAX_AGE_MS || !sameString(sig, await sign(ts))) {
      return reject(400);
    }

    const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || "unknown";
    if (limited(ip)) return reject(429);
    if (!(await turnstileOk(body.turnstile, ip))) return reject(400);

    const mode = typeof body.mode === "string" && MODES.includes(body.mode) ? body.mode : "general";
    const data = body.data && typeof body.data === "object" ? (body.data as Record<string, unknown>) : null;
    if (!data) return reject(400);

    const web = body.form === "web";
    const entries = (web ? WEB_KEYS : ALLOWED_KEYS).filter((key) => typeof data[key] === "string" && data[key])
      .map((key) => [key, String(data[key]).slice(0, LONG_KEYS.includes(key) ? 3000 : 200)] as const);
    const email = data["メールアドレス"];
    const has = (name: string) => entries.some(([key]) => key === name);
    const hasBody = web ? WEB_REQUIRED.every(has) : mode === "apply" || has("お問い合わせ内容");
    if (!isEmail(email) || !has("お名前") || !hasBody) return reject(400);

    const resend = new Resend(process.env.RESEND_API_KEY);
    const modeLabel = web ? "ホームページ制作のお申し込み" : mode === "partner" ? "パートナー企業募集" : mode === "apply" ? "応募する" : "一般問い合わせ";
    const bodyText = entries.map(([key, value]) => `${key}: ${value}`).join("\n");

    const { error } = await resend.emails.send({
      from: `Jotto Webサイト <${process.env.CONTACT_FROM_EMAIL}>`,
      to: process.env.CONTACT_TO_EMAIL as string,
      replyTo: email,
      subject: web ? `【ホームページ制作】お申し込み（${entries.find(([key]) => key === "会社名・屋号")?.[1] ?? ""}）`.replace(/[\r\n]/g, " ") : `【お問い合わせ】${modeLabel}`,
      text: bodyText,
    });

    if (error) {
      console.error("Resend error:", error);
      return reject(500);
    }

    // 受付確認の自動返信(失敗しても、お問い合わせ自体は受け付け済みとして扱う)
    // 悪用を避けるため、入力された本文は載せず定型文だけを送る
    try {
      const auto = await resend.emails.send({
        from: `株式会社Jotto <${process.env.CONTACT_FROM_EMAIL}>`,
        to: email,
        replyTo: process.env.CONTACT_TO_EMAIL as string,
        subject: web ? "【株式会社Jotto】ホームページ制作のお申し込みを受け付けました" : "【株式会社Jotto】お問い合わせを受け付けました",
        text: (web ? [
          "このたびは株式会社Jottoのホームページ制作にお申し込みいただき、ありがとうございます。",
          "ヒアリングシートを受け付けました。",
          "",
          "内容を確認のうえ、金額と納期を制作担当よりメールでご連絡いたします。",
          "この時点では料金は発生しません。お見積りにご了承いただいてから、制作を開始します。",
          "",
          "■ 受付時間：平日 10:00〜18:00",
          "時間外にいただいたご連絡は、翌営業日以降に順次お返事いたします。",
          "なお、やり取りはメールまたはLINEの文章のみで進めております。",
          "対面・電話・オンラインでの打ち合わせは行っておりませんので、あらかじめご了承ください。",
          "",
          "※このメールは自動送信です。お心当たりのない場合は、お手数ですが本メールを破棄してください。",
          "",
          "株式会社Jotto 制作担当",
          "https://jotto.co.jp/web-production",
        ] : [
          "このたびは株式会社Jottoへお問い合わせいただき、ありがとうございます。",
          "以下の種類でお問い合わせを受け付けました。",
          "",
          `お問い合わせの種類: ${modeLabel}`,
          "",
          "内容を確認のうえ、担当者よりメールでご連絡いたします。",
          "",
          "※このメールは自動送信です。お心当たりのない場合は、お手数ですが本メールを破棄してください。",
          "",
          "株式会社Jotto",
          "https://jotto.co.jp",
        ]).join("\n"),
      });
      if (auto.error) console.error("Resend auto-reply error:", auto.error);
    } catch (autoError) {
      console.error("Auto-reply error:", autoError);
    }

    return NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Contact form error:", error);
    return reject(500);
  }
}
