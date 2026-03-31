import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BLOGS } from "@/src/lib/blog";

type BlogPost = (typeof BLOGS)[number];

const parseDate = (date?: string) => {
  if (!date) return 0;
  const parsed = new Date(date).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
};

const getSortedBlogs = () => {
  return [...BLOGS].sort((a, b) => {
    const aTime = parseDate(a.publishISO || a.publishDate);
    const bTime = parseDate(b.publishISO || b.publishDate);
    return bTime - aTime;
  });
};

const normalizeCategory = (category?: string) => {
  if (!category) return "";
  const value = category.trim().toLowerCase();

  if (value.includes("politic")) return "Politics";
  if (value.includes("finance")) return "Finance";
  if (value.includes("real estate")) return "Real Estate";
  if (value.includes("technology") || value.includes("tech")) return "Technology";
  if (value.includes("plumbing")) return "Plumbing";
  if (value.includes("digital")) return "Digital Marketing";
  if (value.includes("home")) return "Home Improvements";
  if (value.includes("health")) return "Health";

  return category.trim();
};

const getLatestUniqueCategoryBlogs = (excludeSlug?: string) => {
  const sorted = getSortedBlogs();
  const seen = new Set<string>();
  const result: BlogPost[] = [];

  for (const blog of sorted) {
    const normalizedCategory = normalizeCategory(blog.category);

    if (blog.slug === excludeSlug) continue;
    if (seen.has(normalizedCategory)) continue;

    seen.add(normalizedCategory);
    result.push({
      ...blog,
      category: normalizedCategory,
    });
  }

  return result;
};

const categoryStyles: Record<string, string> = {
  Politics: "border-[#dc2626]/25 bg-[#fef2f2] text-[#dc2626]",
  Finance: "border-[#2563eb]/25 bg-[#eff6ff] text-[#2563eb]",
  "Real Estate": "border-[#92400e]/25 bg-[#fef3c7] text-[#92400e]",
  Technology: "border-[#7c3aed]/25 bg-[#f5f3ff] text-[#7c3aed]",
  Plumbing: "border-[#0891b2]/25 bg-[#ecfeff] text-[#0891b2]",
  Health: "border-[#16a34a]/25 bg-[#f0fdf4] text-[#16a34a]",
  "Digital Marketing": "border-[#c026d3]/25 bg-[#fdf4ff] text-[#c026d3]",
  "Home Improvements": "border-[#0f766e]/25 bg-[#f0fdfa] text-[#0f766e]",
};

const darkCategoryStyles: Record<string, string> = {
  Politics: "border-[#f87171]/35 bg-[#dc2626]/15 text-[#fca5a5]",
  Finance: "border-[#60a5fa]/35 bg-[#2563eb]/15 text-[#93c5fd]",
  "Real Estate": "border-[#d97706]/35 bg-[#92400e]/20 text-[#fbbf24]",
  Technology: "border-[#a78bfa]/35 bg-[#7c3aed]/15 text-[#c4b5fd]",
  Plumbing: "border-[#67e8f9]/35 bg-[#0891b2]/15 text-[#a5f3fc]",
  Health: "border-[#4ade80]/35 bg-[#16a34a]/15 text-[#86efac]",
  "Digital Marketing": "border-[#e879f9]/35 bg-[#c026d3]/15 text-[#f0abfc]",
  "Home Improvements": "border-[#5eead4]/35 bg-[#0f766e]/15 text-[#99f6e4]",
};

const CategoryLabel = ({
  text,
  dark = false,
}: {
  text: string;
  dark?: boolean;
}) => (
  <span
    className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.18em] ${
      dark
        ? darkCategoryStyles[text] || "border-white/20 bg-white/10 text-white"
        : categoryStyles[text] || "border-[#FF5A14]/20 bg-[#fff7f3] text-[#FF5A14]"
    }`}
  >
    {text}
  </span>
);

const DateText = ({
  text,
  dark = false,
}: {
  text: string;
  dark?: boolean;
}) => (
  <p className={`mt-2 text-[12px] font-medium ${dark ? "text-white/65" : "text-slate-500"}`}>
    {text}
  </p>
);

const BigFeaturedCard = ({ post }: { post: BlogPost }) => (
  <Link href={`/blog/${post.slug}`} className="group block">
    <article className="relative overflow-hidden rounded-lg border border-slate-200 bg-[#0b1220] shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
      <div className="relative h-[400px] overflow-hidden md:h-[380px] xl:h-[460px]">
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          unoptimized
          sizes="(max-width: 1280px) 100vw, 60vw"
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/45 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.18)_0%,rgba(2,6,23,0.32)_35%,rgba(2,6,23,0.82)_100%)]" />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
            Featured Story
          </span>
          <CategoryLabel text={post.category} dark />
        </div>

        <h2 className="mt-2 text-[1.9rem] font-bold leading-[1.05] text-white transition duration-300 group-hover:text-white/90 md:text-[2.1rem]">
          {post.title}
        </h2>

        <DateText
          text={`${post.publishDate}${post.readingTime ? `    ${post.readingTime}` : ""}`}
          dark
        />

        <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
          Read article
          <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  </Link>
);

const TopCard = ({ post }: { post: BlogPost }) => (
  <Link href={`/blog/${post.slug}`} className="group block h-full">
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_6px_24px_rgba(15,23,42,0.045)] transition duration-300 hover:shadow-[0_14px_36px_rgba(15,23,42,0.09)]">
      <div className="relative h-[110px] overflow-hidden md:h-[120px] xl:h-[132px]">
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          unoptimized
          sizes="(max-width: 1280px) 100vw, 20vw"
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-80" />
      </div>

      <div className="flex flex-1 flex-col border-t border-slate-100 p-3.5">
        <CategoryLabel text={post.category} />

        <h3 className="mt-2.5 line-clamp-3 text-[1rem] font-bold leading-snug text-[#0B1220] transition duration-300 group-hover:text-[#FF5A14] md:text-[1.08rem]">
          {post.title}
        </h3>

        <div className="mt-auto">
          <DateText text={post.publishDate} />
        </div>
      </div>
    </article>
  </Link>
);

const SmallBottomCard = ({ post }: { post: BlogPost }) => (
  <Link href={`/blog/${post.slug}`} className="group block h-full">
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_5px_20px_rgba(15,23,42,0.04)] transition duration-300 hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
      <div className="relative h-[100px] overflow-hidden md:h-[95px] xl:h-[110px]">
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          unoptimized
          sizes="(max-width: 1280px) 100vw, 16vw"
          className="object-cover transition duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col border-t border-slate-100 p-3 pt-3">
        <CategoryLabel text={post.category} />

        <h4 className="mt-2.5 line-clamp-3 text-[0.95rem] font-semibold leading-snug text-[#0B1220] transition duration-300 group-hover:text-[#FF5A14]">
          {post.title}
        </h4>

        <div className="mt-auto">
          <DateText text={post.publishDate} />
        </div>
      </div>
    </article>
  </Link>
);

const SideHorizontalCard = ({ post }: { post: BlogPost }) => (
  <Link href={`/blog/${post.slug}`} className="group block">
    <article className="grid min-h-[108px] grid-cols-[118px_1fr] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_5px_20px_rgba(15,23,42,0.04)] transition duration-300 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)] max-sm:grid-cols-1">
      <div className="relative h-full min-h-[108px] overflow-hidden max-sm:h-[128px] max-sm:min-h-0">
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          unoptimized
          className="object-cover object-center transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/15 to-transparent max-sm:bg-gradient-to-t" />
      </div>

      <div className="flex min-w-0 flex-col justify-center border-l border-slate-100 p-3.5 max-sm:border-l-0 max-sm:border-t">
        <CategoryLabel text={post.category} />

        <h4 className="mt-2 line-clamp-2 text-[0.92rem] font-semibold leading-snug text-[#0B1220] transition duration-300 group-hover:text-[#FF5A14]">
          {post.title}
        </h4>

        <DateText text={post.publishDate} />
      </div>
    </article>
  </Link>
);

const HeroSection = () => {
  const sortedBlogs = getSortedBlogs();
  const featured = sortedBlogs[0];

  if (!featured) return null;

  const categoryLatest = getLatestUniqueCategoryBlogs(featured.slug);

  const topRight = categoryLatest.slice(0, 2);
  const bottomLeft = categoryLatest.slice(2, 5);
  const rightList = categoryLatest.slice(5, 8);

  return (
    <section className="mx-auto max-w-360 px-5 py-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-baseline-last gap-3">
            <Image src="/images/sectionicon.svg" alt="section icon" width={25} height={25} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5A14]">
              Latest Blogs
            </span>
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0B1220] md:text-4xl">
            Latest Updates & Insights
          </h1>
        </div>

        <Link
          href="/blog"
          className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#FF5A14]/30 bg-[#FF5A14]/5 px-5 py-2.5 text-sm font-semibold text-[#FF5A14] transition-all duration-300 hover:bg-[#FF5A14] hover:text-white"
        >
          Explore All Articles
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-10">
        <div className="lg:col-span-6">
          <BigFeaturedCard post={featured} />

          {bottomLeft.length > 0 && (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:auto-rows-fr xl:grid-cols-3">
              {bottomLeft.map((post) => (
                <SmallBottomCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-4">
          {topRight.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {topRight.map((post) => (
                <TopCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          {rightList.length > 0 && (
            <div className="mt-4 space-y-3">
              {rightList.map((post) => (
                <SideHorizontalCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;