import type { Metadata } from "next";
import ContactPageSection from "@/src/sections/ContactPageSection";

export const metadata: Metadata = {
  metadataBase: new URL("https://topicler.com"),

  title: "Contact Topicler | Questions, Feedback & Support",

  description:
    "Contact Topicler with questions, feedback, suggestions, or support requests about our idea discovery and topic generation tools.",

  keywords: [
    "Contact Topicler",
    "Topicler contact",
    "Topicler support",
    "Topicler feedback",
    "Topicler questions",
    "Topicler suggestions",
    "Topicler tools",
    "Topicler support team",
  ],

  authors: [
    {
      name: "Topicler",
      url: "https://topicler.com",
    },
  ],

  creator: "Topicler",
  publisher: "Topicler",
  category: "Contact",

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    title: "Contact Topicler | Questions, Feedback & Support",
    description:
      "Get in touch with Topicler for questions, feedback, suggestions, or support related to our tools and resources.",
    url: "https://topicler.com/contact",
    siteName: "Topicler",
    images: [
      {
        url: "https://topicler.com/images/ogImage.png",
        width: 1200,
        height: 630,
        alt: "Contact Topicler",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Topicler | Questions, Feedback & Support",
    description:
      "Get in touch with Topicler for questions, feedback, suggestions, or support about our tools and resources.",
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

export default function ContactPage() {
  return <ContactPageSection />;
}