import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mode, data } = body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const modeLabel =
      mode === "partner" ? "パートナー企業募集" : mode === "apply" ? "応募する" : "一般問い合わせ";

    const bodyText = Object.entries(data)
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    await transporter.sendMail({
      from: `"Jotto Webサイト" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: (data.email || data.applyEmail || data.generalEmail) as string | undefined,
      subject: `【お問い合わせ】${modeLabel}`,
      text: bodyText,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ success: false, error: "送信に失敗しました" }, { status: 500 });
  }
}

export const runtime = "nodejs";
