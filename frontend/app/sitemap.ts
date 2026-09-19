import type { MetadataRoute } from "next";
import { BLOGS } from "../src/lib/blog";

export const dynamic = "force-static";

const SITE_URL = "https://topicler.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: "2026-09-19",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/tools/random-topic-generator/`,
      lastModified: "2026-09-19",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blogs/`,
      lastModified: "2026-09-19",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about/`,
      lastModified: "2026-09-19",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact/`,
      lastModified: "2026-09-19",
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = BLOGS.map((blog) => {
    const blogPath = blog.canonicalPath || `/blog/${blog.slug}/`;

    return {
      url: `${SITE_URL}${
        blogPath.startsWith("/") ? blogPath : `/${blogPath}`
      }`,
      lastModified:
        blog.publishISO || blog.publishDate || "2026-09-19",
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  return [...staticPages, ...blogPages];
}