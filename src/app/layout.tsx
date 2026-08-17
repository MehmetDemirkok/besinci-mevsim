import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScrollProvider } from "@/components/cinematic/SmoothScrollProvider";
import { getDictionary, isLocale, localeStorageKey, defaultLocale } from "@/i18n";
import { isThemeMode, themeInitScript, themeStorageKey } from "@/lib/theme";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

const tr = getDictionary("tr");

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: tr.meta.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: tr.meta.description,
  applicationName: siteConfig.name,
  keywords: tr.meta.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "travel",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: ["en_US"],
    siteName: siteConfig.name,
    title: tr.meta.title,
    description: tr.meta.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: tr.meta.title,
    description: tr.meta.description,
    images: [
      {
        url: siteConfig.ogImage,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/images/brand/logo.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef3f4" },
    { media: "(prefers-color-scheme: dark)", color: "#071014" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const raw = cookieStore.get(localeStorageKey)?.value;
  const initialLocale = raw && isLocale(raw) ? raw : defaultLocale;
  const themeRaw = cookieStore.get(themeStorageKey)?.value;
  const initialThemeMode = themeRaw && isThemeMode(themeRaw) ? themeRaw : "auto";

  return (
    <html
      lang={initialLocale}
      className={`${manrope.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-void text-mist">
        <LanguageProvider initialLocale={initialLocale}>
          <ThemeProvider initialMode={initialThemeMode}>
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
