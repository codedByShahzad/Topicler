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

const getTrendingBlogs = (limit = 6): BlogPost[] => {
  return [...BLOGS]
    .map((blog) => ({
      ...blog,
      category: normalizeCategory(blog.category),
    }))
    .sort((a, b) => {
      const aTime = parseDate(a.publishISO || a.publishDate);
      const bTime = parseDate(b.publishISO || b.publishDate);
      return bTime - aTime;
    })
    .slice(6, 6 + limit);
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

const CategoryLabel = ({ text }: { text: string }) => (
  <span
    className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.18em] ${
      categoryStyles[text] || "border-slate-200 bg-slate-50 text-slate-700"
    }`}
  >
    {text}
  </span>
);

const TrendingCard = ({
  post,
  index,
}: {
  post: BlogPost;
  index: number;
}) => (
  <Link href={`/blog/${post.slug}`} className="group block h-full">
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.045)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(15,23,42,0.08)]">
      <div className="relative h-[210px] overflow-hidden">
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center transition duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

        <div className="absolute left-4 top-4 inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-full border border-white/20 bg-white/90 px-2 text-sm font-bold text-[#0B1220] shadow-sm backdrop-blur-md">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <div className="flex flex-1 flex-col border-t border-slate-100 p-4">
        <CategoryLabel text={post.category} />

        <h3 className="mt-3 line-clamp-3 text-[1.02rem] font-semibold leading-snug text-[#0B1220] transition duration-300 group-hover:text-[#FF5A14]">
          {post.title}
        </h3>

        {post.subtitle && (
          <p className="mt-2 line-clamp-2 text-[13px] leading-6 text-slate-500">
            {post.subtitle}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <p className="text-[12px] font-medium text-slate-500">
            {post.publishDate}
          </p>

          <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#FF5A14] transition duration-300 group-hover:gap-2">
            Read
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </article>
  </Link>
);

const TrendingSection = () => {
  const trendingPosts = getTrendingBlogs(6);

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-10 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/sectionicon.svg"
              alt="section icon"
              width={25}
              height={25}
            />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5A14]">
              Trending Posts
            </span>
          </div>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0B1220] md:text-4xl">
            What readers are exploring now
          </h2>

          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600">
            Discover the stories gaining attention across our latest editorial coverage.
          </p>
        </div>

        <Link
          href="/blog"
          className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#FF5A14]/30 bg-[#FF5A14]/5 px-5 py-2.5 text-sm font-semibold text-[#FF5A14] transition-all duration-300 hover:bg-[#FF5A14] hover:text-white"
        >
          View All Trending
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 sm:auto-rows-fr xl:grid-cols-3">
        {trendingPosts.map((post, index) => (
          <TrendingCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;