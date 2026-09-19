import type { Metadata } from "next";
import { SITE_URL } from "./layout";

import { redirect } from "next/navigation";

// The "%s | Topicler" template is defined in app/layout.tsx, which is the SAME
// route segment as this file. Next.js does not apply a template to its own
// segment, so this title renders exactly as written — no brand suffix is added.
// Verify in View Source after deploy.
export const metadata: Metadata = {
  title: "Topicler — Free AI Topic Generators for Writers & Creators",

  description:
    "Stuck for ideas? Topicler's free AI tools generate fresh topics for essays, " +
    "blogs, videos, debates and conversations — ten ideas in one click, no sign-up.",

  alternates: { canonical: "/" },

  openGraph: {
    url: `${SITE_URL}/`,
    title: "Topicler — Free AI Topic Generators for Writers & Creators",
    description:
      "Free AI tools that generate fresh topics for essays, blogs, videos, " +
      "debates and conversations. Ten ideas in one click.",
  },

  twitter: {
    title: "Topicler — Free AI Topic Generators",
    description:
      "Fresh topics for essays, blogs, videos, debates and conversations. " +
      "Free, no sign-up.",
  },
};


export default function HomePage() {
  redirect("/tools/random-topic-generator");
}