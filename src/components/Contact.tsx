"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Mail, MapPin } from "lucide-react";
import { BrandImage } from "@/components/ui/BrandImage";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig, telHref, whatsappHref, mapsHref } from "@/lib/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { InstagramLink } from "@/components/ui/InstagramLink";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { readContactIntent } from "@/lib/contact-intent";

export function Contact() {
  const { t } = useLanguage();
  const { email, phone, address, whatsapp } = siteConfig.contact;
  const [activeTopic, setActiveTopic] = useState(t.contact.topics[0]?.id ?? "general");
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [message, setMessage] = useState("");
  const [vehicle, setVehicle] = useState<string | null>(null);

  useEffect(() => {
    const intent = readContactIntent();
    if (intent.topic && t.contact.topics.some((item) => item.id === intent.topic)) {
      setActiveTopic(intent.topic);
    }
    if (intent.vehicle) {
      setVehicle(intent.vehicle);
      setMessage((current) =>
        current.includes(intent.vehicle!)
          ? current
          : current
            ? current
            : intent.vehicle!,
      );
    }
  }, [t.contact.topics]);

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

  const submitRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !topic) return;

    const lines = [
      `${t.contact.name}: ${name}`,
      `${t.contact.phone}: ${phoneValue}`,
      vehicle ? `${t.fleet.requestCta}: ${vehicle}` : "",
      "",
      message,
    ].filter((line) => line !== "");

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(topic.subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden on-media"
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0">
        <BrandImage
          src="/images/brand/contact-bg.png"
          alt=""
          atmosphere="road"
          className="h-full w-full"
          sizes="100vw"
          imageClassName="object-cover object-center"
        />
        <div className="absolute inset-0 bg-void/80" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,20,0.5)_0%,rgba(7,16,20,0.84)_48%,rgba(7,16,20,0.97)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(24,187,208,0.16),transparent_45%)]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1440px] gap-12 safe-px pt-20 pb-fab md:gap-16 md:px-8 md:pt-28 md:pb-28 lg:grid-cols-12 lg:px-10">
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
          <p className="mt-8 text-sm tracking-[0.06em] text-mist-muted">
            {t.contact.responseNote}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6" y={28}>
          <div className="border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0 xl:pl-14">
            <p className="text-eyebrow text-gold">{t.contact.writeUs}</p>

            {email ? (
              <form className="mt-6" onSubmit={submitRequest}>
                <p className="text-sm text-mist-muted">{t.contact.topicHint}</p>

                <div className="mt-5">
                  <p className="text-eyebrow text-mist-muted" id="contact-topics-label">
                    {t.contact.topicsLabel}
                  </p>
                  <div
                    className="mt-4 flex flex-wrap gap-2"
                    role="group"
                    aria-labelledby="contact-topics-label"
                  >
                    {t.contact.topics.map((item) => {
                      const active = item.id === activeTopic;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveTopic(item.id)}
                          className={`min-h-11 border px-4 py-2.5 text-sm tracking-[0.04em] transition-colors ${
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

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm text-mist-muted">
                    {t.contact.name}
                    <input
                      required
                      name="name"
                      autoComplete="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder={t.contact.namePlaceholder}
                      className="mt-2 w-full border border-line-strong bg-void/40 px-4 py-3 text-base text-mist placeholder:text-mist-muted/70"
                    />
                  </label>
                  <label className="block text-sm text-mist-muted">
                    {t.contact.phone}
                    <input
                      required
                      type="tel"
                      name="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={phoneValue}
                      onChange={(event) => setPhoneValue(event.target.value)}
                      placeholder={t.contact.phonePlaceholder}
                      className="mt-2 w-full border border-line-strong bg-void/40 px-4 py-3 text-base text-mist placeholder:text-mist-muted/70"
                    />
                  </label>
                </div>

                <label className="mt-4 block text-sm text-mist-muted">
                  {t.contact.message}
                  <textarea
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder={t.contact.messagePlaceholder}
                    className="mt-2 w-full resize-y border border-line-strong bg-void/40 px-4 py-3 text-base text-mist placeholder:text-mist-muted/70"
                    autoComplete="off"
                  />
                </label>

                <p className="mt-4 text-sm text-mist-muted">{t.contact.formHint}</p>

                <button
                  type="submit"
                  className="group mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-mist px-7 py-4 text-sm tracking-[0.1em] text-void transition-colors hover:bg-cyan sm:w-auto"
                >
                  {t.contact.submit}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <div className="mt-10">
                  <p className="text-sm text-mist-muted">{t.contact.emailHint}</p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-stretch">
                    <a
                      href={mailto}
                      className="group flex min-w-0 flex-1 items-center justify-between gap-4 border border-mist/15 bg-mist/[0.04] px-5 py-5 transition-colors hover:border-cyan/50 hover:bg-cyan/[0.06]"
                    >
                      <span className="min-w-0">
                        <span className="flex items-center gap-2 text-eyebrow text-mist-muted">
                          <Mail className="h-3.5 w-3.5 text-cyan" aria-hidden />
                          {t.contact.mailtoFallback}
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
                      className="inline-flex min-h-12 items-center justify-center gap-2 border border-line-strong px-5 py-5 text-sm tracking-[0.08em] text-mist-muted transition-colors hover:border-mist/30 hover:text-mist sm:min-w-[9rem]"
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
                  <p className="sr-only" aria-live="polite">
                    {copied ? t.contact.copied : ""}
                  </p>
                  <div className="mt-4">
                    <InstagramLink variant="row" />
                  </div>
                </div>
              </form>
            ) : (
              <p className="mt-6 text-mist-muted">{t.contact.comingSoon}</p>
            )}

            {(phone || whatsapp || address) && (
              <div className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
                {phone ? (
                  <div>
                    <p className="text-eyebrow text-mist-muted">{t.contact.phone}</p>
                    <a
                      href={telHref(phone)}
                      className="mt-3 inline-flex min-h-11 items-center text-lg font-medium tracking-tight text-mist transition-colors hover:text-cyan"
                    >
                      {phone}
                    </a>
                  </div>
                ) : null}
                {whatsapp ? (
                  <div>
                    <p className="text-eyebrow text-mist-muted">WhatsApp</p>
                    <a
                      href={whatsappHref(whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-3 inline-flex min-h-11 items-center gap-2 border border-cyan/40 bg-cyan/10 px-5 py-3 text-sm tracking-[0.1em] text-mist transition-colors hover:border-cyan hover:bg-cyan hover:text-void"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      {t.contact.whatsappCta}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                ) : null}
                {address ? (
                  <div className="sm:col-span-2">
                    <p className="text-eyebrow text-mist-muted">
                      {t.contact.address}
                    </p>
                    <p className="mt-3 max-w-md text-mist">{address}</p>
                    <a
                      href={mapsHref(address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-4 inline-flex min-h-11 items-center gap-2 border border-mist/20 px-5 py-3 text-sm tracking-[0.1em] text-mist transition-colors hover:border-cyan hover:bg-cyan hover:text-void"
                    >
                      <MapPin className="h-4 w-4" aria-hidden />
                      {t.contact.openMap}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
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
