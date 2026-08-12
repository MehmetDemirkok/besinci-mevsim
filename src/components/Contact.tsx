"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/site";
import { useLanguage } from "@/i18n/LanguageProvider";

export function Contact() {
  const { t } = useLanguage();
  const { email, phone, address } = siteConfig.contact;
  const hasDetails = Boolean(email || phone || address);

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-ink py-20 md:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[50%] w-[70%] -translate-x-1/2 rounded-full bg-cyan/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-5 text-center md:px-8">
        <Reveal>
          <p className="text-eyebrow text-cyan">{t.contact.eyebrow}</p>
          <h2 id="contact-heading" className="mt-6 text-display-sm text-mist">
            {t.contact.titleLine1}
            <br />
            {t.contact.titleLine2}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-mist-muted">
            {t.contact.body}
          </p>

          {email ? (
            <a
              href={`mailto:${email}`}
              className="group mt-12 inline-flex items-center gap-2 border border-mist/20 bg-mist px-8 py-4 text-sm tracking-[0.1em] text-void transition-colors hover:border-cyan hover:bg-cyan"
            >
              {t.contact.cta}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            <p className="mt-12 text-sm tracking-[0.14em] text-mist-soft">
              {t.contact.comingSoon}
            </p>
          )}
        </Reveal>

        <Reveal delay={0.12} className="mt-16">
          {hasDetails ? (
            <dl className="mx-auto grid max-w-3xl gap-8 text-left sm:grid-cols-3">
              {phone ? (
                <div>
                  <dt className="text-eyebrow text-mist-soft">{t.contact.phone}</dt>
                  <dd className="mt-3 text-mist">
                    <a href={`tel:${phone}`} className="hover:text-cyan">
                      {phone}
                    </a>
                  </dd>
                </div>
              ) : null}
              {email ? (
                <div>
                  <dt className="text-eyebrow text-mist-soft">{t.contact.email}</dt>
                  <dd className="mt-3 text-mist">
                    <a href={`mailto:${email}`} className="hover:text-cyan">
                      {email}
                    </a>
                  </dd>
                </div>
              ) : null}
              {address ? (
                <div>
                  <dt className="text-eyebrow text-mist-soft">{t.contact.address}</dt>
                  <dd className="mt-3 text-mist">{address}</dd>
                </div>
              ) : null}
            </dl>
          ) : (
            <div className="mx-auto grid max-w-3xl gap-6 border-t border-line pt-10 text-left sm:grid-cols-3 sm:gap-8">
              <div>
                <p className="text-eyebrow text-mist-soft">{t.contact.phone}</p>
                <p className="mt-3 text-mist-muted">{t.contact.toBeProvided}</p>
              </div>
              <div>
                <p className="text-eyebrow text-mist-soft">{t.contact.email}</p>
                <p className="mt-3 text-mist-muted">{t.contact.toBeProvided}</p>
              </div>
              <div>
                <p className="text-eyebrow text-mist-soft">{t.contact.address}</p>
                <p className="mt-3 text-mist-muted">{t.contact.toBeProvided}</p>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
