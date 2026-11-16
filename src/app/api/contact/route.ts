import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

const isEmail = (v: unknown): v is string => typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mode, data } = body as { mode?: string; data?: Record<string, unknown> };
    if (!data || typeof data !== "object") {
      return NextResponse.json({ success: false, error: "入力内容を確認してください" }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const modeLabel =
      mode === "partner" ? "パートナー企業募集" : mode === "apply" ? "応募する" : "一般問い合わせ";

    const entries = Object.entries(data)
      .filter(([key, value]) => key !== "email" && typeof value === "string" && value)
      .map(([key, value]) => [key.slice(0, 40), String(value).slice(0, 5000)] as const);
    if (entries.length === 0) {
      return NextResponse.json({ success: false, error: "入力内容を確認してください" }, { status: 400 });
    }
    const bodyText = entries.map(([key, value]) => `${key}: ${value}`).join("\n");

    const candidate = data.email ?? data["メールアドレス"] ?? data.applyEmail ?? data.generalEmail;
    const replyToEmail = isEmail(candidate) ? candidate : undefined;

    const { error } = await resend.emails.send({
      from: `Jotto Webサイト <${process.env.CONTACT_FROM_EMAIL}>`,
      to: process.env.CONTACT_TO_EMAIL as string,
      replyTo: replyToEmail,
      subject: `【お問い合わせ】${modeLabel}`,
      text: bodyText,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ success: false, error: "送信に失敗しました" }, { status: 500 });
    }

    // 受付確認の自動返信(失敗しても、お問い合わせ自体は受け付け済みとして扱う)
    // 悪用を避けるため、入力された本文は載せず定型文だけを送る
    if (replyToEmail) {
      try {
        const auto = await resend.emails.send({
          from: `株式会社Jotto <${process.env.CONTACT_FROM_EMAIL}>`,
          to: replyToEmail,
          replyTo: process.env.CONTACT_TO_EMAIL as string,
          subject: "【株式会社Jotto】お問い合わせを受け付けました",
          text: [
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
          ].join("\n"),
        });
        if (auto.error) console.error("Resend auto-reply error:", auto.error);
      } catch (autoError) {
        console.error("Auto-reply error:", autoError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ success: false, error: "送信に失敗しました" }, { status: 500 });
  }
}
