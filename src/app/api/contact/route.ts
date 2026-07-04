import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mode, data } = body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    const modeLabel =
      mode === "partner" ? "パートナー企業募集" : mode === "apply" ? "応募する" : "一般問い合わせ";

    const bodyText = Object.entries(data as Record<string, string>)
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    const replyToEmail =
      (data.email || data.applyEmail || data.generalEmail) as string | undefined;

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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ success: false, error: "送信に失敗しました" }, { status: 500 });
  }
}
