import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  metadataBase: new URL("https://topicler.com"),

  title: "Random Topic Generator | Generate Topics Instantly",

  description:
    "Generate random topics instantly with Topicler. Get creative topic ideas, writing prompts, discussion topics, and content ideas for free.",

  keywords: [
    "Topicler",
    "random topic generator",
    "random topic generator online",
    "random topics",
    "topic generator",
    "topic ideas",
    "random topic ideas",
    "content ideas",
    "writing prompts",
    "creative writing topics",
    "discussion topics",
    "interesting topics",
    "blog topic ideas",
    "free topic generator",
    "generate random topics",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Random Topic Generator | Generate Topics Instantly",

    description:
      "Generate random topics instantly with Topicler. Discover creative ideas, writing prompts, discussion topics, and content ideas for free.",

    url: "https://topicler.com",

    siteName: "Topicler",

    images: [
      {
        url: "https://topicler.com/images/ogImage.png",
        width: 1200,
        height: 630,
        alt: "Topicler Random Topic Generator",
      },
    ],

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Random Topic Generator | Topicler",

    description:
      "Generate random topics, writing prompts, creative ideas, and content topics instantly with Topicler.",

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
    },
  },

  icons: {
    icon: "/favicon.ico",
  },

  category: "technology",
};

export default function HomePage() {
  redirect("/tools/random-topic-generator");
}