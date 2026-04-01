import type { Metadata } from "next";
import { Suspense } from "react";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://topicler.com"),

  title: "All Blogs | Topicler",

  description:
    "Browse all blogs on Topicler covering Politics, Finance, Real Estate, Technology, Plumbing, Digital Marketing, Health, and Home Improvements.",

  keywords: [
    "Topicler blog",
    "all blogs",
    "politics blogs",
    "finance blogs",
    "real estate blogs",
    "technology blogs",
    "plumbing blogs",
    "digital marketing blogs",
    "health blogs",
    "home improvement blogs",
    "latest articles",
    "trending blogs",
  ],

  alternates: {
    canonical: "/blog",
  },

  openGraph: {
    title: "All Blogs | Topicler",
    description:
      "Explore all Topicler blogs with expert articles on Politics, Finance, Real Estate, Technology, Plumbing, Digital Marketing, Health, and Home Improvements.",
    url: "https://topicler.com/blog",
    siteName: "Topicler",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://topicler.com/images/ogImage.png", // ✅ fixed
        width: 1200,
        height: 630,
        alt: "Topicler Blog",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "All Blogs | Topicler",
    description:
      "Browse the latest blogs and articles on Topicler across Politics, Finance, Tech, Marketing, Health, Plumbing, and more.",
    images: ["https://topicler.com/images/ogImage.png"], // ✅ fixed
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

  category: "blog",
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