import type { Metadata } from "next";
import ContactPageSection from "@/src/sections/ContactPageSection";

export const metadata: Metadata = {
  metadataBase: new URL("https://topicler.com"),

  title: "Contact Topicler | Get in Touch",

  description:
    "Have a question, suggestion, or feedback about Topicler? Get in touch with us and share your thoughts.",

  keywords: [
    "Contact Topicler",
    "Topicler contact",
    "Topicler feedback",
    "Topicler support",
    "Topicler questions",
    "Topicler tools",
    "contact Topicler team",
  ],

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    title: "Contact Topicler | Get in Touch",

    description:
      "Have a question, suggestion, or feedback about Topicler? Get in touch with us and share your thoughts.",

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

    title: "Contact Topicler | Get in Touch",

    description:
      "Have a question, suggestion, or feedback about Topicler? Get in touch with us and share your thoughts.",

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