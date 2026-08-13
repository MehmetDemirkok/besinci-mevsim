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
        className="flex min-h-[100svh] items-end bg-void pb-20 pt-32 md:pb-28 md:pt-40"
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
              className="inline-flex items-center justify-center bg-mist px-7 py-4 text-sm tracking-[0.1em] text-void transition-colors hover:bg-cyan"
            >
              {tr.notFound.home}
            </Link>
            <Link
              href="/hizmetler"
              className="inline-flex items-center justify-center border border-line px-7 py-4 text-sm tracking-[0.1em] text-mist transition-colors hover:border-cyan/40"
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
