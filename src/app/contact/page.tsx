"use client";

import Link from "next/link";
import { CSSProperties, FormEvent, useEffect, useMemo, useState } from "react";

type ContactMode = "partner" | "apply" | "general";

type FormState = {
  companyName: string;
  phone: string;
  email: string;
  partnerMessage: string;
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  applyPhone: string;
  applyEmail: string;
  desiredPosition: string;
  applyMessage: string;
  generalName: string;
  generalPhone: string;
  generalEmail: string;
  generalMessage: string;
};

const defaultFormState: FormState = {
  companyName: "",
  phone: "",
  email: "",
  partnerMessage: "",
  lastName: "",
  firstName: "",
  lastNameKana: "",
  firstNameKana: "",
  applyPhone: "",
  applyEmail: "",
  desiredPosition: "",
  applyMessage: "",
  generalName: "",
  generalPhone: "",
  generalEmail: "",
  generalMessage: "",
};

const modeButtons: Array<{ key: ContactMode; label: string }> = [
  { key: "partner", label: "パートナー企業募集" },
  { key: "apply", label: "応募する" },
  { key: "general", label: "一般問い合わせ" },
];

const positionOptions = [
  "事業開発プロジェクトマネージャー",
  "不動産営業・管理スタッフ",
  "エンジニア（Web/アプリ開発）",
  "携帯販売スタッフ",
];

const fieldBaseStyle: CSSProperties = {
  width: "100%",
  backgroundColor: "#141414",
  border: "1px solid #2a2a2a",
  color: "#f0ede8",
  borderRadius: 0,
  padding: "12px 14px",
  outline: "none",
  transition: "border-color 0.25s ease",
};

const labelClassName = "text-xs uppercase tracking-[0.1em]";

function FieldLabel({ htmlFor, children, required = false }: { htmlFor: string; children: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className={labelClassName} style={{ color: "#8a8a8a" }}>
      {children}
      {required ? " *" : ""}
    </label>
  );
}

function InputField(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={fieldBaseStyle}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "#C0392B";
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "#2a2a2a";
        props.onBlur?.(e);
      }}
    />
  );
}

function TextareaField(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      style={{ ...fieldBaseStyle, minHeight: 140, resize: "vertical" }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "#C0392B";
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "#2a2a2a";
        props.onBlur?.(e);
      }}
    />
  );
}

function SelectField(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      style={{ ...fieldBaseStyle, appearance: "none" }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "#C0392B";
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "#2a2a2a";
        props.onBlur?.(e);
      }}
    />
  );
}

export default function ContactPage() {
  const [mode, setMode] = useState<ContactMode>("general");
  const [heroVisible, setHeroVisible] = useState(false);
  const [formData, setFormData] = useState<FormState>(defaultFormState);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  const heroText = "Let's work together.";

  const requiredMissing = useMemo(() => {
    if (mode === "partner") {
      return !formData.companyName || !formData.phone || !formData.email || !formData.partnerMessage;
    }
    if (mode === "apply") {
      return (
        !formData.lastName ||
        !formData.firstName ||
        !formData.lastNameKana ||
        !formData.firstNameKana ||
        !formData.applyPhone ||
        !formData.applyEmail ||
        !formData.desiredPosition
      );
    }
    return !formData.generalName || !formData.generalEmail || !formData.generalMessage;
  }, [formData, mode]);

  const updateField = (key: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (requiredMissing) return;
    setPendingSubmit(true);
    setShowConsentModal(true);
  };

  const confirmSubmit = () => {
    setShowConsentModal(false);
    setPendingSubmit(false);
    setSubmitted(true);
  };

  const cancelSubmit = () => {
    setShowConsentModal(false);
    setPendingSubmit(false);
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#0a0a0a", color: "#f0ede8" }}>
      <section className="min-h-[50vh] flex flex-col items-center justify-center px-6 py-24 pt-32" style={{ backgroundColor: "#0a0a0a" }}>
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#C0392B" }}>
          CONTACT
        </p>
        <p className="text-xl md:text-2xl font-extralight tracking-[0.15em] mb-4" style={{ color: "#8a8a8a" }}>
          お問い合わせ
        </p>
        <div className="w-64 h-px mb-6" style={{ backgroundColor: "#C0392B" }} />
        <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.08em] text-center" style={{ color: "#f0ede8" }}>
          {heroText.split("").map((char, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: 0,
                ...(heroVisible
                  ? {
                      animation: "fadeInChar 0.05s ease forwards",
                      animationDelay: `${0.3 + i * 0.05}s`,
                    }
                  : {}),
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </section>

      <section className="py-20" style={{ backgroundColor: "#141414" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {modeButtons.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setMode(item.key);
                  setSubmitted(false);
                }}
                className="px-6 py-3 text-sm tracking-[0.08em] transition-all duration-300"
                style={{
                  backgroundColor: mode === item.key ? "#C0392B" : "transparent",
                  color: "#f0ede8",
                  border: mode === item.key ? "1px solid #C0392B" : "1px solid #2a2a2a",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {submitted ? (
            <div className="text-center py-16 border" style={{ borderColor: "#2a2a2a", color: "#f0ede8" }}>
              お問い合わせを受け付けました。
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              {mode === "partner" && (
                <>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="companyName" required>企業名</FieldLabel>
                    <InputField id="companyName" value={formData.companyName} onChange={(e) => updateField("companyName", e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="partnerPhone" required>電話番号</FieldLabel>
                    <InputField id="partnerPhone" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="partnerEmail" required>メールアドレス</FieldLabel>
                    <InputField id="partnerEmail" type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="partnerMessage" required>問い合わせ内容</FieldLabel>
                    <TextareaField id="partnerMessage" value={formData.partnerMessage} onChange={(e) => updateField("partnerMessage", e.target.value)} required />
                  </div>
                </>
              )}

              {mode === "apply" && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FieldLabel htmlFor="lastName" required>姓</FieldLabel>
                      <InputField id="lastName" value={formData.lastName} onChange={(e) => updateField("lastName", e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <FieldLabel htmlFor="firstName" required>名</FieldLabel>
                      <InputField id="firstName" value={formData.firstName} onChange={(e) => updateField("firstName", e.target.value)} required />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FieldLabel htmlFor="lastNameKana" required>フリガナ（姓）</FieldLabel>
                      <InputField id="lastNameKana" value={formData.lastNameKana} onChange={(e) => updateField("lastNameKana", e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <FieldLabel htmlFor="firstNameKana" required>フリガナ（名）</FieldLabel>
                      <InputField id="firstNameKana" value={formData.firstNameKana} onChange={(e) => updateField("firstNameKana", e.target.value)} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="applyPhone" required>電話番号</FieldLabel>
                    <InputField id="applyPhone" value={formData.applyPhone} onChange={(e) => updateField("applyPhone", e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="applyEmail" required>メールアドレス</FieldLabel>
                    <InputField id="applyEmail" type="email" value={formData.applyEmail} onChange={(e) => updateField("applyEmail", e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="desiredPosition" required>希望職種</FieldLabel>
                    <SelectField id="desiredPosition" value={formData.desiredPosition} onChange={(e) => updateField("desiredPosition", e.target.value)} required>
                      <option value="">選択してください</option>
                      {positionOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </SelectField>
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="applyMessage">問い合わせ内容</FieldLabel>
                    <TextareaField id="applyMessage" value={formData.applyMessage} onChange={(e) => updateField("applyMessage", e.target.value)} />
                  </div>
                </>
              )}

              {mode === "general" && (
                <>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="generalName" required>お名前</FieldLabel>
                    <InputField id="generalName" value={formData.generalName} onChange={(e) => updateField("generalName", e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="generalPhone">電話番号</FieldLabel>
                    <InputField id="generalPhone" value={formData.generalPhone} onChange={(e) => updateField("generalPhone", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="generalEmail" required>メールアドレス</FieldLabel>
                    <InputField id="generalEmail" type="email" value={formData.generalEmail} onChange={(e) => updateField("generalEmail", e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="generalMessage" required>問い合わせ内容</FieldLabel>
                    <TextareaField id="generalMessage" value={formData.generalMessage} onChange={(e) => updateField("generalMessage", e.target.value)} required />
                  </div>
                </>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={pendingSubmit}
                  className="px-10 py-4 text-sm tracking-[0.1em] transition-all duration-300"
                  style={{
                    backgroundColor: "#C0392B",
                    color: "#f0ede8",
                    border: "1px solid #C0392B",
                    opacity: pendingSubmit ? 0.75 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!pendingSubmit) e.currentTarget.style.backgroundColor = "#9f2f25";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#C0392B";
                  }}
                >
                  送信する
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {showConsentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ backgroundColor: "rgba(10,10,10,0.75)" }}>
          <div className="w-full max-w-lg border p-6 md:p-8" style={{ backgroundColor: "#141414", borderColor: "#2a2a2a" }}>
            <h3 className="text-lg md:text-xl font-light mb-4" style={{ color: "#f0ede8" }}>
              個人情報の取り扱いについて
            </h3>
            <div className="text-sm leading-relaxed mb-8" style={{ color: "#8a8a8a" }}>
              <p>当社は、ご入力いただいた個人情報を以下の目的で利用いたします。</p>
              <p>・お問い合わせへの回答</p>
              <p>・当社サービスのご案内</p>
              <p>・採用選考に関する連絡</p>
              <p className="mt-4">取得した個人情報は、法令に基づく場合を除き、第三者に提供することはありません。</p>
              <p>
                詳細は「
                <Link href="/privacy" className="underline underline-offset-2" style={{ color: "#f0ede8" }}>
                  プライバシーポリシー
                </Link>
                」をご確認ください。
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={confirmSubmit}
                className="px-5 py-3 text-sm tracking-[0.08em]"
                style={{ backgroundColor: "#C0392B", color: "#f0ede8", border: "1px solid #C0392B" }}
              >
                同意して送信する
              </button>
              <button
                type="button"
                onClick={cancelSubmit}
                className="px-5 py-3 text-sm tracking-[0.08em]"
                style={{ backgroundColor: "transparent", color: "#f0ede8", border: "1px solid #2a2a2a" }}
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
