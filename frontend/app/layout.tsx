import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import Navbar from "@/src/components/Navbar";

import Footer from "@/src/components/Footer";

import Script from "next/script";

import GoogleAnalytics from "@/src/components/GoogleAnalytics"; // ✅ Client component

import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const SITE_URL = "https://topicler.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Topicler — Free AI Topic Generators for Writers & Creators",
    template: "%s | Topicler",
  },

  description:
    "Topicler's free AI tools generate fresh topics for essays, blogs, videos, " +
    "debates and conversations — ten ideas in one click, no sign-up.",

  applicationName: "Topicler",

  // Named human beats brand-as-author for E-E-A-T. Point at the About page.
  authors: [{ name: "Shahzad", url: `${SITE_URL}/about/` }],
  creator: "Shahzad",
  publisher: "Topicler",

  // NOTE: deliberately NO `alternates` here. A canonical set in the root layout
  // is inherited by every child page that forgets to set its own, which would
  // make that page claim "/" as its canonical. Set canonical per page only.

  openGraph: {
    type: "website",
    siteName: "Topicler",
    locale: "en_US",
    // NOTE: deliberately NO `url` here, for the same inheritance reason.
    // A missing og:url is better than a wrong one. Every page sets its own.
    images: [
      {
        url: "/images/ogImage.png",
        width: 1200,
        height: 630,
        alt: "Topicler — free AI topic generators",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    images: ["/images/ogImage.png"],
    // Add `site: "@handle"` only once a real account exists. Do not invent one.
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
    icon: "/favicon.ico",
    // TODO: generate and add once the files exist —
    // apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
    // and 192 / 512 PNGs for the web manifest.
    // Do not reference icon files that are not in /public — they 404.
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Google Analytics Scripts */}

      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-7TNVTJLEMH"
      />

      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-7TNVTJLEMH', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <body className="min-h-full flex flex-col">
        <Navbar />

        {/* GA tracking */}
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>

        {children}

        <Footer />
      </body>
    </html>
  );
}