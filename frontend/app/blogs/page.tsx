import type { Metadata } from "next";
import { SITE_URL } from "@/app/layout";
import { Suspense } from "react";
import BlogListClient from "./BlogListClient";

// `absolute` bypasses the "%s | Topicler" template because this title already
// contains the brand. Without it you would get "... Blog | Topicler".
export const metadata: Metadata = {
  title: { absolute: "Topic Ideas & Writing Prompts — The Topicler Blog" },

  description:
    "Curated topic lists, writing prompts and idea guides for students, " +
    "speakers, writers and content creators — plus how to use topic " +
    "generators well.",

  // FIXED: was "/blog", which is not the listing route.
  alternates: { canonical: "/blogs/" },

  openGraph: {
    type: "website",
    url: `${SITE_URL}/blogs/`,   // FIXED: was https://topicler.com/blog
    title: "Topic Ideas & Writing Prompts — The Topicler Blog",
    description:
      "Curated topic lists, writing prompts and idea guides for students, " +
      "speakers, writers and content creators.",
  },

  twitter: {
    title: "Topic Ideas & Writing Prompts — The Topicler Blog",
    description:
      "Curated topic lists, writing prompts and idea guides for writers, " +
      "students and creators.",
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