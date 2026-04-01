import type { Metadata } from "next";
import ContactPageSection from "@/src/sections/ContactPageSection";

export const metadata: Metadata = {
  metadataBase: new URL("https://topicler.com"),
  title: "Contact Us | Topicler",
  description:
    "Get in touch with Topicler for feedback, editorial inquiries, collaborations, and general questions. Reach out to our team through the contact form.",
  keywords: [
    "Contact Topicler",
    "Topicler contact page",
    "editorial inquiries",
    "collaborations",
    "general contact",
    "blog contact form",
    "contact Topicler team",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Topicler",
    description:
      "Get in touch with Topicler for feedback, editorial inquiries, collaborations, and general questions.",
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
    title: "Contact Us | Topicler",
    description:
      "Get in touch with Topicler for feedback, editorial inquiries, collaborations, and general questions.",
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