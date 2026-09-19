import type { Metadata } from "next";
import { SITE_URL } from "@/app/layout";
import ContactPageSection from "@/src/sections/ContactPageSection";

export const metadata: Metadata = {
  title: { absolute: "Contact Topicler — Support, Feedback & Partnerships" },

  description:
    "Questions, bug reports, feature requests or partnership enquiries? " +
    "Get in touch with Topicler — every message gets a reply.",

  alternates: { canonical: "/contact/" },

  openGraph: {
    type: "website",
    url: `${SITE_URL}/contact/`,
    title: "Contact Topicler — Support, Feedback & Partnerships",
    description:
      "Questions, bug reports, feature requests or partnership enquiries? " +
      "Get in touch.",
  },

  twitter: {
    title: "Contact Topicler",
    description: "Questions, feedback, bug reports or partnership enquiries.",
  },
};

export default function ContactPage() {
  return <ContactPageSection />;
}