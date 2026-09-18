import type { Metadata } from "next";
import { Suspense } from "react";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://topicler.com"),

  title: "Topicler Resources | Guides, Insights & Ideas",

  description:
    "Explore Topicler Resources for practical guides, insights, and helpful articles on content creation, SEO, technology, business, and more.",

  keywords: [
    "Topicler resources",
    "Topicler blog",
    "Topicler articles",
    "content creation guides",
    "SEO guides",
    "content ideas",
    "content strategy",
    "blogging tips",
    "technology guides",
    "business insights",
  ],

  authors: [
    {
      name: "Topicler",
      url: "https://topicler.com",
    },
  ],

  creator: "Topicler",
  publisher: "Topicler",

  category: "Resources",

  alternates: {
    canonical: "/blog",
  },

  openGraph: {
    title: "Topicler Resources | Guides, Insights & Ideas",

    description:
      "Explore Topicler Resources for practical guides, insights, and helpful articles on content creation, SEO, technology, business, and more.",

    url: "https://topicler.com/blog",

    siteName: "Topicler",

    type: "website",

    locale: "en_US",

    images: [
      {
        url: "https://topicler.com/images/ogImage.png",
        width: 1200,
        height: 630,
        alt: "Topicler Resources",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Topicler Resources | Guides, Insights & Ideas",

    description:
      "Explore practical guides, insights, and helpful articles from Topicler on content creation, SEO, technology, business, and more.",

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
};

function BlogPageFallback() {
  return <div>Loading...</div>;
}

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogPageFallback />}>
      <BlogListClient />
    </Suspense>
  );
}