import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://topicler.com"),
  title: {
    default: "Topicler",
    template: "%s | Topicler",
  },
  description:
    "Topicler is a multi-category blog covering Politics, Finance, Real Estate, Technology, Plumbing, Digital Marketing, Health, and Home Improvements.",
  applicationName: "Topicler",
  keywords: [
    "Topicler",
    "blogs",
    "politics blogs",
    "finance blogs",
    "real estate blogs",
    "technology blogs",
    "plumbing blogs",
    "digital marketing blogs",
    "health blogs",
    "home improvement blogs",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Topicler",
    description:
      "Topicler is a multi-category blog covering Politics, Finance, Real Estate, Technology, Plumbing, Digital Marketing, Health, and Home Improvements.",
    url: "https://topicler.com",
    siteName: "Topicler",
    images: [
      {
        url: "https://topicler.com/images/ogImage.png",
        width: 1200,
        height: 630,
        alt: "Topicler",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Topicler",
    description:
      "Explore blogs on Politics, Finance, Real Estate, Technology, Plumbing, Digital Marketing, Health, and Home Improvements.",
    images: ["https://topicler.com/images/ogImage.png"],
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
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}