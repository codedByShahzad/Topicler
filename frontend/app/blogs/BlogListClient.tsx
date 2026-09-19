"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

import { BLOGS } from "../../src/lib/blog";
import BlogCard from "@/src/components/BlogCard";

type Blog = (typeof BLOGS)[number];

const ALL_CATEGORIES = "All";

/* ==========================================================================
   Reveal — scroll / mount entrance

   Inline styles only, so there is no CSS file to import. Animates opacity and
   transform exclusively, which keeps it on the compositor and never triggers
   layout. IntersectionObserver fires once then disconnects.
   Respects prefers-reduced-motion.
   ========================================================================== */

function Reveal({
  children,
  delay = 0,
  className = "",
  immediate = false,
}: {
  children: ReactNode;
  /** Stagger in ms. Keep under ~240 so a row never feels slow. */
  delay?: number;
  className?: string;
  /** Reveal right after mount instead of waiting for scroll. */
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setShown(true);
      return;
    }

    if (immediate) {
      const t = setTimeout(() => setShown(true), 30);
      return () => clearTimeout(t);
    }

    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(14px)",
        transition: `opacity 480ms cubic-bezier(.22,.61,.36,1) ${delay}ms, transform 480ms cubic-bezier(.22,.61,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ==========================================================================
   Helpers
   ========================================================================== */

function formatReadingTime(value?: string | number) {
  if (value === undefined || value === null || value === "") return null;
  return typeof value === "number" ? `${value} min read` : value;
}

/* ==========================================================================
   Featured lead article

   The one place this page raises its voice. Everything below it stays quiet.
   Uses BLOGS[0], so it is fully dynamic and hides itself while filtering.
   ========================================================================== */

function FeaturedArticle({ blog }: { blog: Blog }) {
  const reading = formatReadingTime(blog.readingTime);

  return (
    <article className="group">
      <h1 className="text-2xl font-bold tracking-[-0.02em] text-[#0B1220] mb-2 lg:mb-6">Latest Article</h1>
      <Link
        href={`/blogs/${blog.slug}`}
        className="grid overflow-hidden rounded-3xl border border-[#E8EBF0] bg-white transition-[border-color,box-shadow] duration-300 hover:border-[#FFD5C2] hover:shadow-[0_28px_70px_-40px_rgba(11,18,32,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A14] focus-visible:ring-offset-2 lg:grid-cols-[1.15fr_1fr]"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FFF4EE] lg:aspect-auto lg:min-h-[420px]">
          {blog.heroImage ? (
            <Image
              src={blog.heroImage}
              alt=""
              fill
              sizes="(max-width: 1023px) 100vw, 55vw"
              priority
              className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div aria-hidden className="absolute inset-0 bg-[#FFF4EE]" />
          )}
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full bg-[#FFF4EE] px-3 py-1 font-semibold text-[#C63D08]">
              Latest
            </span>
            {blog.category && (
              <span className="text-slate-500">{blog.category}</span>
            )}
          </div>

          <h3 className="mt-5 text-[28px] font-bold leading-[1.15] tracking-[-0.03em] text-[#0B1220] transition-colors duration-200 group-hover:text-[#C63D08] sm:text-4xl lg:text-[42px]">
            {blog.title}
          </h3>

          {blog.subtitle && (
            <p className="mt-4 max-w-[60ch] text-base leading-8 text-slate-600 sm:text-[17px]">
              {blog.subtitle}
            </p>
          )}

          <div className="mt-7 flex items-center gap-3 text-sm text-slate-500">
            {blog.publishDate && <span>{blog.publishDate}</span>}
            {blog.publishDate && reading && (
              <span aria-hidden className="h-3 w-px bg-slate-200" />
            )}
            {reading && <span>{reading}</span>}
          </div>

          <span className="mt-7 inline-flex w-fit items-center rounded-full bg-[#0B1220] px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 group-hover:bg-[#FF5A14]">
            Read this article
          </span>
        </div>
      </Link>
    </article>
  );
}

/* ==========================================================================
   Empty state
   ========================================================================== */

function EmptyState({
  query,
  onReset,
}: {
  query: string;
  onReset: () => void;
}) {
  return (
    <div className="rounded-3xl border border-[#E8EBF0] bg-[#FFF4EE] px-6 py-20 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#FFD5C2] bg-white">
        <Search aria-hidden className="h-5 w-5 text-[#C63D08]" />
      </div>

      <h2 className="mt-6 text-2xl font-bold tracking-[-0.02em] text-[#0B1220]">
        No articles match that
      </h2>

      <p className="mx-auto mt-3 max-w-[48ch] text-[15px] leading-7 text-slate-600">
        {query
          ? `Nothing found for “${query}”. Try a broader word, or clear the filters to see everything.`
          : "Nothing in this category yet. Clear the filters to see every article."}
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-7 inline-flex items-center rounded-full bg-[#FF5A14] px-6 py-3 text-sm font-semibold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#e94f0d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A14] focus-visible:ring-offset-2"
      >
        Show all articles
      </button>
    </div>
  );
}

/* ==========================================================================
   Blog listing
   ========================================================================== */

export default function BlogListClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlQuery = searchParams.get("search")?.trim() || "";

  // The URL stays the source of truth, so existing links such as
  // /blogs/?search=seo keep working exactly as before. The input mirrors it
  // and writes back on a debounce.
  const [query, setQuery] = useState(urlQuery);
  const [category, setCategory] = useState<string>(ALL_CATEGORIES);
  const firstRun = useRef(true);

  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    const t = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) params.set("search", query.trim());
      else params.delete("search");

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, 300);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const categories = useMemo(() => {
    const found = new Set<string>();
    for (const blog of BLOGS) if (blog.category) found.add(blog.category);
    return [ALL_CATEGORIES, ...Array.from(found).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filteredBlogs = useMemo(() => {
    const q = query.trim().toLowerCase();

    return BLOGS.filter((blog) => {
      if (category !== ALL_CATEGORIES && blog.category !== category) {
        return false;
      }
      if (!q) return true;

      const title = blog.title?.toLowerCase() || "";
      const subtitle = blog.subtitle?.toLowerCase() || "";
      const blogCategory = blog.category?.toLowerCase() || "";

      return (
        title.includes(q) || subtitle.includes(q) || blogCategory.includes(q)
      );
    });
  }, [query, category]);

  const isFiltering = Boolean(query.trim()) || category !== ALL_CATEGORIES;
  const [lead, ...rest] = filteredBlogs;
  const gridItems = isFiltering ? filteredBlogs : rest;

  const resetFilters = () => {
    setQuery("");
    setCategory(ALL_CATEGORIES);
  };

  return (
    <div className="min-h-[92vh] bg-white">
      {/* =========================================================
          MASTHEAD
          Rendered without entrance animation on purpose: the H1 is the
          most important element on the page and should never depend on
          JavaScript to become visible.
      ========================================================= */}
      <header className="border-b border-[#E8EBF0] bg-[#FFF4EE]">
                {/* Hero Content */}
        <div className="relative mx-auto max-w-360 px-5 py-6 text-center sm:py-20 lg:px-8 lg:py-14">
          {/* Eyebrow */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD5C2] bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
              <Image
                src="/images/sectionicon.svg"
                alt="section icon"
                width={18}
                height={18}
              />

            </div>
          </div>

          {/* Heading — KEPT EXACTLY THE SAME */}
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-[#0B1220] sm:text-5xl lg:text-[58px]">
            Explore our{" "}
            <span className="text-[#FF5A14]">
              resources
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-[17px] sm:leading-8">
            Explore practical guides, ideas, and insights designed to help you
            get more from Topicler&apos;s tools.
          </p>
        </div>

      </header>

      {/* =========================================================
          CATEGORY FILTERS
          Built from the real category values in BLOGS — nothing is
          hardcoded, so new categories appear on their own.
      ========================================================= */}
      <div className="sticky top-0 z-20 border-b border-[#E8EBF0] bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-360 items-center gap-4 px-5 py-3.5 lg:px-8">
          <div
            role="group"
            aria-label="Filter by category"
            className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((name) => {
              const active = category === name;
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(name)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A14] focus-visible:ring-offset-2 ${
                    active
                      ? "border-[#0B1220] bg-[#0B1220] text-white"
                      : "border-[#E8EBF0] bg-white text-slate-600 hover:border-[#FFD5C2] hover:text-[#0B1220]"
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>

          <p
            aria-live="polite"
            className="hidden shrink-0 text-sm text-slate-500 sm:block"
          >
            {filteredBlogs.length} of {BLOGS.length}
          </p>
        </div>
      </div>

      {/* =========================================================
          ARTICLES
      ========================================================= */}
      <main className="mx-auto max-w-360 px-5 py-12 lg:px-8 lg:py-16">
        {filteredBlogs.length === 0 ? (
          <EmptyState query={query} onReset={resetFilters} />
        ) : (
          <>
            {!isFiltering && lead && (
              <section className="mb-14 lg:mb-20">
                <h2 className="sr-only">Featured article</h2>
                <Reveal immediate>
                  <FeaturedArticle blog={lead} />
                </Reveal>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-[#0B1220]">
                {isFiltering ? "Matching articles" : "More articles"}
              </h2>

              <div className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
                {gridItems.map((blog, index) => (
                  <Reveal
                    key={blog.slug}
                    delay={Math.min(index, 2) * 70}
                    className="h-full"
                  >
                    <BlogCard
                      slug={blog.slug}
                      title={blog.title}
                      subtitle={blog.subtitle}
                      heroImage={blog.heroImage}
                      category={blog.category}
                      publishDate={blog.publishDate}
                      readingTime={blog.readingTime}
                      priority={index < 3}
                    />
                  </Reveal>
                ))}
              </div>
            </section>
          </>
        )}


      </main>
    </div>
  );
}