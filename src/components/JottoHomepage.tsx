"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LogoImage } from "@/components/Logo";
import { aboutImage, recruitImage, services } from "@/data/services";

function HeroSection() {
  const text = "Building the Future.";

  return (
    <section className="flex min-h-screen flex-col items-center justify-start bg-background px-6 pb-20 pt-28">
      <LogoImage
        className="mx-auto mb-16 w-72 opacity-90 md:w-96 lg:w-[28rem]"
        width={480}
        height={180}
        priority
      />
      <p className="font-en mb-8 text-center text-base uppercase tracking-[0.3em] text-primary">
        Bridging Business
      </p>
      <p
        className="font-extralight text-2xl md:text-3xl lg:text-4xl tracking-[0.15em] max-w-2xl mx-auto leading-relaxed"
        style={{ color: "rgba(240,237,232,0.8)" }}
      >
        {text.split("").map((char, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              animation: "fadeInChar 0.05s ease forwards",
              animationDelay: `${0.5 + i * 0.05}s`,
              opacity: 0,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </p>
      <p className="mt-8 text-sm tracking-[0.25em] text-muted-foreground">株式会社 Jotto</p>
      <div className="mt-20 flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
        Scroll
        <span className="block h-12 w-px bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  );
}

function AboutSection() {
  const aboutText = "About Jotto";
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = headingRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-background-alt py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div>
          <p className="font-en mb-6 text-[11px] uppercase tracking-[0.35em] text-primary">Company</p>
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl lg:text-5xl font-extralight text-foreground mb-8 leading-tight tracking-wide"
          >
            {aboutText.split("").map((char, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  opacity: 0,
                  ...(isVisible
                    ? {
                        animation: "fadeInChar 0.05s ease forwards",
                        animationDelay: `${0.3 + i * 0.06}s`,
                      }
                    : {}),
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
          <p className="mb-10 text-sm tracking-[0.2em] text-muted-foreground">企業情報</p>
          <p className="text-sm font-light leading-[2.2] text-muted-foreground">空間をつくり、仕組みをつくり、人材をつくる。</p>
          <p className="text-sm font-light leading-[2.2] text-muted-foreground">Jottoは、顧客のビジネス基盤ごと支え、</p>
          <p className="mb-10 text-sm font-light leading-[2.2] text-muted-foreground">お客様の可能性を最大化するパートナーです。</p>
          <Link
            href="/company"
            className="inline-flex bg-primary px-8 py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            会社概要
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[5/4]">
          <Image
            src={aboutImage}
            alt="東京の都市風景"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-80"
          />
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const ourServicesText = "Our Services";
  const serviceRef = useRef<HTMLHeadingElement>(null);
  const [isServiceVisible, setIsServiceVisible] = useState(false);

  useEffect(() => {
    const element = serviceRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServiceVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-background py-28 lg:py-36">
      <div className="mx-auto max-w-full px-0">
        <div className="mb-16 text-center lg:mb-20">
          <p className="font-en mb-5 text-[11px] uppercase tracking-[0.35em] text-primary">Service</p>
          <h2 ref={serviceRef} className="text-3xl md:text-5xl font-extralight text-foreground tracking-wide">
            {isServiceVisible &&
              ourServicesText.split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block"
                  style={{
                    animationName: "fadeInChar",
                    animationDuration: "0.05s",
                    animationTimingFunction: "ease",
                    animationFillMode: "forwards",
                    animationDelay: `${i * 0.06}s`,
                    opacity: 0,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            {!isServiceVisible && <span style={{ opacity: 0 }}>Our Services</span>}
          </h2>
          <p className="mt-4 text-sm tracking-[0.2em] text-muted-foreground">事業紹介</p>
        </div>
        <div className="w-full px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <article key={service.num} className="group relative overflow-hidden">
                <div className="relative aspect-[16/8]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-en mb-2 text-[10px] uppercase tracking-[0.25em] text-primary">{service.num}</p>
                    <h3 className="mb-2 min-h-[4rem] flex items-end text-lg font-light text-foreground">{service.title}</h3>
                    <p className="text-xs font-light leading-relaxed text-muted-foreground">{service.desc}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-12 px-4 text-right lg:px-8">
          <Link
            href="/service"
            className="inline-flex bg-primary px-8 py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            事業紹介
          </Link>
        </div>
      </div>
    </section>
  );
}

function CareersSection() {
  const careersRef = useRef<HTMLHeadingElement>(null);
  const [isCareersVisible, setIsCareersVisible] = useState(false);

  useEffect(() => {
    const element = careersRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCareersVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-background-alt py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div className="relative order-2 aspect-[4/3] overflow-hidden lg:order-1 lg:aspect-[5/4]">
          <Image
            src={recruitImage}
            alt="チームで働くオフィスの様子"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-80"
          />
        </div>
        <div className="order-1 lg:order-2">
          <p className="font-en mb-6 text-[11px] uppercase tracking-[0.35em] text-primary">Recruit</p>
          <h2 ref={careersRef} className="text-3xl md:text-4xl lg:text-5xl font-extralight text-foreground mb-8 leading-tight tracking-wide">
            {"Careers".split("").map((char, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  opacity: 0,
                  ...(isCareersVisible
                    ? {
                        animation: "fadeInChar 0.05s ease forwards",
                        animationDelay: `${0.3 + i * 0.06}s`,
                      }
                    : {}),
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
          <p className="mb-10 text-sm tracking-[0.2em] text-muted-foreground">採用情報</p>
          <p className="mb-10 text-sm font-light leading-[2.2] text-muted-foreground">
            株式会社Jottoは、「できる」ことを仕事にする会社です。あなたが作りたい未来を一緒に作りたい。共に未来をつくる仲間を募集しています。
          </p>
          <Link
            href="/recruit"
            className="inline-flex bg-primary px-8 py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            採用情報
          </Link>
        </div>
      </div>
    </section>
  );
}

function NewsSection() {
  const newsRef = useRef<HTMLHeadingElement>(null);
  const [isNewsVisible, setIsNewsVisible] = useState(false);

  useEffect(() => {
    const element = newsRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNewsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const newsItems = [
    { date: "2026 / 06", tag: "NEWS", title: "株式会社Jotto　設立" },
    { date: "2026 / 06", tag: "SERVICE", title: "Webアプリ「禁煙ペイ」　リリース" },
    { date: "2026 / 06", tag: "NEWS", title: "コーポレートサイト　オープン" },
  ];

  const informationText = "Information";

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-12">
        <div className="mb-16 text-center">
          <p className="font-en mb-5 text-[11px] uppercase tracking-[0.35em] text-primary">News</p>
          <h2 ref={newsRef} className="font-en text-4xl font-extralight tracking-wide text-foreground md:text-5xl">
            {informationText.split("").map((char, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  opacity: 0,
                  ...(isNewsVisible
                    ? {
                        animation: "fadeInChar 0.05s ease forwards",
                        animationDelay: `${0.3 + i * 0.06}s`,
                      }
                    : {}),
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
          <p className="mt-4 text-sm tracking-[0.2em] text-muted-foreground">お知らせ</p>
        </div>
        <ul className="border-t border-border">
          {newsItems.map((item) => (
            <li
              key={item.title}
              className="grid gap-4 border-b border-border py-8 md:grid-cols-[160px_110px_1fr] md:items-center md:gap-8"
            >
              <span className="font-en text-[13px] tracking-[0.06em] text-muted-foreground">{item.date}</span>
              <span className="inline-block w-fit border border-primary/45 px-3 py-1 text-[9px] tracking-[0.15em] text-primary">
                {item.tag}
              </span>
              <span className="text-sm text-foreground/85">{item.title}</span>
            </li>
          ))}
        </ul>
        <div className="mt-12 text-right">
          <Link
            href="/news"
            className="inline-flex bg-primary px-8 py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            お知らせ
          </Link>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const contactRef = useRef<HTMLHeadingElement>(null);
  const [isContactVisible, setIsContactVisible] = useState(false);

  useEffect(() => {
    const element = contactRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsContactVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const contactText = "Let's work together.";

  return (
    <section id="contact" className="bg-background-alt py-28 lg:py-36">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
        <p className="font-en mb-5 text-[11px] uppercase tracking-[0.35em] text-primary">Contact</p>
        <h2 ref={contactRef} className="font-en mb-6 text-4xl font-extralight tracking-wide text-foreground md:text-5xl">
          {contactText.split("").map((char, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: 0,
                ...(isContactVisible
                  ? {
                      animation: "fadeInChar 0.05s ease forwards",
                      animationDelay: `${0.3 + i * 0.06}s`,
                    }
                  : {}),
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>
        <p className="mb-12 text-sm leading-[2.2] text-muted-foreground">お気軽にご相談ください</p>
        <a
          href="/contact"
          className="inline-flex bg-primary px-10 py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground transition-opacity hover:opacity-90"
        >
          お問い合わせ
        </a>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center lg:px-12">
        <LogoImage className="mb-6 w-32 opacity-70" width={128} height={48} />
        <p className="text-xs tracking-[0.15em] text-muted-foreground">
          © 2026 Jotto Inc. All rights reserved.
        </p>
        <div className="mt-6 flex gap-6">
          <Link href="/privacy" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
            プライバシーポリシー
          </Link>
          <Link href="/legal" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
            特定商取引法に基づく表記
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default function JottoHomepage() {
  return (
    <div className="bg-background text-foreground">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CareersSection />
      <NewsSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
