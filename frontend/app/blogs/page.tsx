import type { Metadata } from "next";
import { SITE_URL } from "@/app/layout";
import BlogListClient from "./BlogListClient";
import { getSolvixBlogs } from "@/src/lib/solvix";

export const metadata: Metadata = {
  title: {
    absolute: "Topic Ideas & Writing Prompts — The Topicler Blog",
  },

  description:
    "Curated topic lists, writing prompts and idea guides for students, " +
    "speakers, writers and content creators — plus how to use topic " +
    "generators well.",

  alternates: {
    canonical: "/blogs/",
  },

  openGraph: {
    type: "website",
    url: `${SITE_URL}/blogs/`,
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

export default async function BlogPage() {
  const blogs = await getSolvixBlogs();

  return <BlogListClient blogs={blogs} />;
}