import type { Metadata } from "next";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, Folder, ArrowUpRight } from "lucide-react";
import { BLOGS, getBlogBySlug } from "../../../src/lib/blog";
import type { BlogBlock, BlogSection } from "../../../src/lib/blog";

import TocClient from "./TocClient";


export const dynamicParams = false;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://topicler.com";

function toISODateSafe(dateStr?: string) {
  if (!dateStr) return undefined;
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

function absoluteUrl(path?: string | StaticImageData) {
  if (!path) return `${SITE_URL}/images/ogImage.jpg`;

  const imagePath = typeof path === "string" ? path : path.src;

  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://")
  ) {
    return imagePath;
  }

  return `${SITE_URL}${
    imagePath.startsWith("/") ? imagePath : `/${imagePath}`
  }`;
}


export async function generateStaticParams() {
  return BLOGS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  // With dynamicParams = false this branch is unreachable in a production
  // export. The page component calls notFound(), which is what actually
  // produces the 404 — metadata is not the right tool for that job.
  if (!blog) return {};

  // Defensive: strip a trailing "| Topicler" if an seoTitle was authored with
  // it, otherwise the layout template would append a second one.
  const rawTitle = (blog.seoTitle ?? blog.title)
    .replace(/\s*\|\s*Topicler\s*$/i, "")
    .trim();

  const description = blog.seoDescription ?? blog.subtitle;

  if (process.env.NODE_ENV !== "production" && !description) {
    console.warn(`[seo] Blog "${blog.slug}" has no seoDescription or subtitle.`);
  }

  const canonicalPath = blog.canonicalPath ?? `/blog/${blog.slug}/`;

  const image = absoluteUrl(
    blog.ogImage ?? blog.heroImage ?? "/images/ogImage.png"  // FIXED: was .jpg
  );

  const publishedTime =
    blog.publishISO ?? toISODateSafe(blog.publishDate) ?? undefined;


  return {
    // Plain string — the layout template appends " | Topicler" exactly once.
    title: rawTitle,
    description,

    alternates: { canonical: canonicalPath },

    openGraph: {
      type: "article",
      url: `${SITE_URL}${canonicalPath}`,
      title: rawTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: rawTitle }],
      publishedTime,
      section: blog.category,
      authors: [`${SITE_URL}/about/`],
    },

    twitter: {
      title: rawTitle,
      description,
      images: [image],
    },
  };
}

function GridBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute right-0 top-0 h-full w-[55%] bg-gradient-to-l from-[#FF5A14]/10 via-[#FFF4EE]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
    </div>
  );
}

function SectionRenderer({ section }: { section: BlogSection }) {
  return (
    <section id={section.id} className="scroll-mt-24">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
        {section.title}
      </h2>

      <div className="mt-4 space-y-4">
        {section.content.map((block: BlogBlock, idx: number) => {
          if (block.type === "p") {
            return (
              <p key={idx} className="leading-relaxed text-slate-600">
                {block.text}
              </p>
            );
          }

          if (block.type === "h3") {
            return (
              <h3
                key={idx}
                className="text-base font-semibold text-slate-900 md:text-lg"
              >
                {block.text}
              </h3>
            );
          }

          if (block.type === "ul") {
            return (
              <ul key={idx} className="list-disc space-y-2 pl-5 text-slate-600">
                {block.items.map((it: string, i: number) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            );
          }

          if (block.type === "quote") {
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#FF5A14]/20 bg-[#FFF4EE] p-4 text-slate-700"
              >
                <p className="leading-relaxed">{block.text}</p>
              </div>
            );
          }

          return null;
        })}
      </div>
    </section>
  );
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = getBlogBySlug(slug);
  if (!blog) return notFound();

  const related = BLOGS.filter(
    (b) => b.category === blog.category && b.slug !== blog.slug
  )
    .sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    )
    .slice(0, 6);

  const tocSections = blog.sections.map((s) => ({ id: s.id, title: s.title }));
  const publishedTime =
    blog.publishISO ?? toISODateSafe(blog.publishDate) ?? undefined;
  const articleUrl = `${SITE_URL}${blog.canonicalPath ?? `/blog/${blog.slug}`}`;
  const articleImage = absoluteUrl(
    blog.ogImage ?? blog.heroImage ?? "/images/ogImage.jpg"
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.seoTitle ?? blog.title,
    description: blog.seoDescription ?? blog.subtitle,
    image: [articleImage],
    mainEntityOfPage: articleUrl,
    url: articleUrl,
    datePublished: publishedTime,
    dateModified: publishedTime,
    articleSection: blog.category,
    keywords: blog.keywords?.join(", "),
    author: {
      "@type": "Organization",
      name: "Topicler",
    },
    publisher: {
      "@type": "Organization",
      name: "Topicler",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <div className="relative min-h-[92vh] bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <GridBackground />

      <div className="mx-auto max-w-360 px-3 py-4 sm:px-4 md:px-6 md:py-10">
        {/* HERO */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/70 shadow-sm">
          <div className="relative h-[550px] md:h-[480px]">
            <Image
              src={blog.heroImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />

            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/85 via-[#020617]/35 to-transparent" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08)_0%,rgba(2,6,23,0.16)_35%,rgba(2,6,23,0.72)_100%)]" />
              <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-[#020617]/90 via-[#020617]/45 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/90 px-3 py-1 text-xs text-slate-700 backdrop-blur">
                <Folder className="h-4 w-4 text-[#FF5A14]" />
                {blog.category}
              </div>

              <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
                {blog.title}
              </h1>

              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/85 sm:text-base">
                {blog.subtitle}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/80 sm:text-sm">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-[#FFB38F]" />
                  {blog.publishDate}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#FFB38F]" />
                  {blog.readingTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <section className="mt-6 md:mt-8">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm sm:p-6 md:p-8">
                <div className="space-y-10">
                  {blog.sections.map((s) => (
                    <SectionRenderer key={s.id} section={s} />
                  ))}
                </div>
              </div>
            </div>

            <aside className="hidden self-start lg:sticky lg:top-24 lg:col-span-4 lg:block">
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
                <TocClient
                  sections={tocSections}
                  publishDate={blog.publishDate}
                  readingTime={blog.readingTime}
                />
              </div>
            </aside>
          </div>
        </section>

        {/* RELATED POSTS */}
        {related.length > 0 && (
          <section className="mt-10">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Related posts
              </h3>

              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 rounded-full bg-[#FF5A14] px-4 py-2 text-sm font-medium text-white hover:bg-[#e14e12] hover:shadow-md"
              >
                <span>View all</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white/80 shadow-sm transition hover:border-[#FF5A14]/30 hover:bg-[#FFF4EE]"
                >
                  <div className="relative h-40">
                    <Image
                      src={p.heroImage}
                      alt={p.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="rounded-full border border-slate-200 bg-white/90 px-2.5 py-1 text-xs text-slate-700">
                        {p.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h4 className="line-clamp-2 text-base font-semibold text-slate-900 transition group-hover:text-[#FF5A14]">
                      {p.title}
                    </h4>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                      {p.subtitle}
                    </p>

                    <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        {p.publishDate}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {p.readingTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}