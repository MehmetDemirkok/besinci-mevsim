"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { BrandImage } from "@/components/ui/BrandImage";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/site";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Contact() {
  const { t } = useLanguage();
  const { email, phone, address } = siteConfig.contact;
  const [activeTopic, setActiveTopic] = useState(t.contact.topics[0]?.id ?? "general");
  const [copied, setCopied] = useState(false);

  const topic =
    t.contact.topics.find((item) => item.id === activeTopic) ??
    t.contact.topics[0];

  const mailto = email
    ? `mailto:${email}?subject=${encodeURIComponent(topic?.subject ?? "")}`
    : undefined;

  const copyEmail = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore clipboard failures
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0">
        <BrandImage
          src="/images/services/accommodation.png"
          alt=""
          atmosphere="hotel"
          className="h-full w-full"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-void/78" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,20,0.55)_0%,rgba(7,16,20,0.82)_45%,rgba(7,16,20,0.96)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(24,187,208,0.14),transparent_45%)]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1440px] gap-12 safe-px py-20 md:gap-16 md:px-8 md:py-28 lg:grid-cols-12 lg:px-10">
        <Reveal className="lg:col-span-6">
          <p className="text-eyebrow text-cyan">{t.contact.eyebrow}</p>
          <h2
            id="contact-heading"
            className="mt-5 max-w-xl text-display-sm text-mist"
          >
            {t.contact.titleLine1}
            <br />
            {t.contact.titleLine2}
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-mist-muted md:text-lg">
            {t.contact.body}
          </p>
          <p className="mt-8 text-sm tracking-[0.06em] text-mist-soft">
            {t.contact.responseNote}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6" y={28}>
          <div className="border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0 xl:pl-14">
            <p className="text-eyebrow text-gold">{t.contact.writeUs}</p>

            {email ? (
              <div className="mt-6">
                <p className="text-sm text-mist-soft">{t.contact.emailHint}</p>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-stretch">
                  <a
                    href={mailto}
                    className="group flex min-w-0 flex-1 items-center justify-between gap-4 border border-mist/15 bg-mist/[0.04] px-5 py-5 transition-colors hover:border-cyan/50 hover:bg-cyan/[0.06]"
                  >
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 text-eyebrow text-mist-soft">
                        <Mail className="h-3.5 w-3.5 text-cyan" aria-hidden />
                        {t.contact.email}
                      </span>
                      <span className="mt-2 block truncate text-lg font-medium tracking-tight text-mist md:text-xl">
                        {email}
                      </span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-cyan transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex items-center justify-center gap-2 border border-line-strong px-5 py-5 text-sm tracking-[0.08em] text-mist-muted transition-colors hover:border-mist/30 hover:text-mist sm:min-w-[9rem]"
                    aria-label={copied ? t.contact.copied : t.contact.copy}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-cyan" />
                        {t.contact.copied}
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        {t.contact.copy}
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-10">
                  <p className="text-eyebrow text-mist-soft">
                    {t.contact.topicsLabel}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {t.contact.topics.map((item) => {
                      const active = item.id === activeTopic;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveTopic(item.id)}
                          className={`border px-4 py-2.5 text-sm tracking-[0.04em] transition-colors ${
                            active
                              ? "border-cyan/60 bg-cyan/10 text-mist"
                              : "border-line-strong text-mist-muted hover:border-mist/25 hover:text-mist"
                          }`}
                          aria-pressed={active}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <a
                  href={mailto}
                  className="group mt-8 inline-flex w-full items-center justify-center gap-2 bg-mist px-7 py-4 text-sm tracking-[0.1em] text-void transition-colors hover:bg-cyan sm:w-auto"
                >
                  {t.contact.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            ) : (
              <p className="mt-6 text-mist-muted">{t.contact.comingSoon}</p>
            )}

            {(phone || address) && (
              <div className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
                {phone ? (
                  <div>
                    <p className="text-eyebrow text-mist-soft">{t.contact.phone}</p>
                    <a
                      href={`tel:${phone}`}
                      className="mt-3 inline-block text-mist transition-colors hover:text-cyan"
                    >
                      {phone}
                    </a>
                  </div>
                ) : null}
                {address ? (
                  <div>
                    <p className="text-eyebrow text-mist-soft">
                      {t.contact.address}
                    </p>
                    <p className="mt-3 text-mist">{address}</p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
