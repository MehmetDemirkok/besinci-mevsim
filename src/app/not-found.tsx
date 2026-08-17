import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getDictionary } from "@/i18n";

const tr = getDictionary("tr");

export const metadata: Metadata = {
  title: tr.notFound.title,
  description: tr.notFound.description,
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        id="main"
        className="flex min-h-[100svh] items-end bg-void pb-[max(5rem,calc(3rem+env(safe-area-inset-bottom)))] pt-[calc(8rem+env(safe-area-inset-top))] md:pb-28 md:pt-40"
      >
        <div className="mx-auto w-full max-w-[1440px] safe-px md:px-8 lg:px-10">
          <p className="text-eyebrow text-cyan">404</p>
          <h1 className="mt-5 max-w-3xl text-display-sm text-mist md:text-display">
            {tr.notFound.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist-muted md:text-lg">
            {tr.notFound.description}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/"
              className="inline-flex min-h-12 w-full items-center justify-center bg-mist px-7 py-4 text-sm tracking-[0.1em] text-void transition-colors hover:bg-cyan sm:w-auto"
            >
              {tr.notFound.home}
            </Link>
            <Link
              href="/hizmetler"
              className="inline-flex min-h-12 w-full items-center justify-center border border-line px-7 py-4 text-sm tracking-[0.1em] text-mist transition-colors hover:border-cyan/40 sm:w-auto"
            >
              {tr.notFound.services}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
