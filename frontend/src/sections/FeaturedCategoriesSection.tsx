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

const normalizeCategory = (category?: string) => {
  if (!category) return "";
  const value = category.trim().toLowerCase();

  if (value.includes("politic")) return "Politics";
  if (value.includes("real estate")) return "Real Estate";
  if (value.includes("digital")) return "Digital Marketing";
  if (value.includes("home")) return "Home Improvements";

  return category.trim();
};

const categoryStyles: Record<string, string> = {
  Politics: "border-[#dc2626]/25 bg-[#fef2f2] text-[#dc2626]",
  "Real Estate": "border-[#92400e]/25 bg-[#fef3c7] text-[#92400e]",
  "Digital Marketing": "border-[#c026d3]/25 bg-[#fdf4ff] text-[#c026d3]",
  "Home Improvements": "border-[#0f766e]/25 bg-[#f0fdfa] text-[#0f766e]",
};

const FEATURED_CATEGORIES = [
  "Politics",
  "Real Estate",
  "Digital Marketing",
  "Home Improvements",
] as const;

const getLatestBlogsByCategory = (category: string, limit = 3): BlogPost[] => {
  return [...BLOGS]
    .map((blog) => ({
      ...blog,
      category: normalizeCategory(blog.category),
    }))
    .filter((blog) => blog.category === category)
    .sort((a, b) => {
      const aTime = parseDate(a.publishISO || a.publishDate);
      const bTime = parseDate(b.publishISO || b.publishDate);
      return bTime - aTime;
    })
    .slice(0, limit);
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

const CategoryPostCard = ({ post }: { post: BlogPost }) => (
  <Link href={`/blog/${post.slug}`} className="group block h-full">
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_5px_20px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
      <div className="relative h-[170px] overflow-hidden">
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center transition duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col border-t border-slate-100 p-4">
        <CategoryLabel text={post.category} />

        <h3 className="mt-3 line-clamp-3 text-[1.02rem] font-semibold leading-snug text-[#0B1220] transition duration-300 group-hover:text-[#FF5A14]">
          {post.title}
        </h3>

        <div className="mt-auto pt-3">
          <p className="text-[12px] font-medium text-slate-500">
            {post.publishDate}
          </p>
        </div>
      </div>
    </article>
  </Link>
);

const CategoryBlock = ({ category }: { category: string }) => {
  const posts = getLatestBlogsByCategory(category, 3);

  if (!posts.length) return null;

  return (
    <div className=" ">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <CategoryLabel text={category} />
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0B1220]">
            {category}
          </h2>
        </div>

        <Link
          href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-[#FF5A14] transition duration-300 hover:gap-3"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <CategoryPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

const FeaturedCategoriesSection = () => {
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
              Featured Categories
            </span>
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0B1220] md:text-4xl">
            Explore by category
          </h1>
        </div>

        <Link
          href="/categories"
          className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#FF5A14]/30 bg-[#FF5A14]/5 px-5 py-2.5 text-sm font-semibold text-[#FF5A14] transition-all duration-300 hover:bg-[#FF5A14] hover:text-white"
        >
          Browse All Categories
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="space-y-6">
        {FEATURED_CATEGORIES.map((category) => (
          <CategoryBlock key={category} category={category} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategoriesSection;