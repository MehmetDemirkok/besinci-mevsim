import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { SmoothScrollProvider } from "@/components/cinematic/SmoothScrollProvider";
import { getDictionary } from "@/i18n";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

const tr = getDictionary("tr");

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: tr.meta.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: tr.meta.description,
  applicationName: siteConfig.name,
  keywords: tr.meta.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: ["en_US"],
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: tr.meta.title,
    description: tr.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: tr.meta.title,
    description: tr.meta.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      tr: "/",
      en: "/",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#071014",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${manrope.variable} antialiased`}>
      <body className="min-h-screen bg-void text-mist">
        <LanguageProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
