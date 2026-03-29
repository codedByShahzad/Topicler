import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FolderOpen, Sparkles, Activity, CalendarDays } from "lucide-react";
import { BLOGS } from "@/src/lib/blog";

type BlogPost = (typeof BLOGS)[number];

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

const slugifyCategory = (category: string) =>
  category.toLowerCase().replace(/\s+/g, "-");

const parseDate = (date?: string) => {
  if (!date) return 0;
  const parsed = new Date(date).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
};

const CATEGORY_META: Record<
  string,
  {
    description: string;
    accent: string;
    softBg: string;
    border: string;
    iconBg: string;
  }
> = {
  Politics: {
    description:
      "Latest political news, policy insights, governance updates, and global affairs coverage.",
    accent: "text-[#dc2626]",
    softBg: "bg-[#fef2f2]",
    border: "border-[#fecaca]",
    iconBg: "bg-[#dc2626]/10",
  },
  Finance: {
    description:
      "Money, markets, personal finance, investing, and practical financial strategy explained clearly.",
    accent: "text-[#2563eb]",
    softBg: "bg-[#eff6ff]",
    border: "border-[#bfdbfe]",
    iconBg: "bg-[#2563eb]/10",
  },
  "Real Estate": {
    description:
      "Property trends, housing guides, market movement, buying, selling, and real estate advice.",
    accent: "text-[#92400e]",
    softBg: "bg-[#fef3c7]",
    border: "border-[#fcd34d]",
    iconBg: "bg-[#92400e]/10",
  },
  Technology: {
    description:
      "AI, software, innovation, digital tools, and emerging technology shaping modern life.",
    accent: "text-[#7c3aed]",
    softBg: "bg-[#f5f3ff]",
    border: "border-[#ddd6fe]",
    iconBg: "bg-[#7c3aed]/10",
  },
  Plumbing: {
    description:
      "Practical plumbing advice, homeowner fixes, maintenance ideas, and service insights.",
    accent: "text-[#0891b2]",
    softBg: "bg-[#ecfeff]",
    border: "border-[#a5f3fc]",
    iconBg: "bg-[#0891b2]/10",
  },
  Health: {
    description:
      "Health insights, wellbeing trends, medical topics, and practical guidance for better living.",
    accent: "text-[#16a34a]",
    softBg: "bg-[#f0fdf4]",
    border: "border-[#bbf7d0]",
    iconBg: "bg-[#16a34a]/10",
  },
  "Digital Marketing": {
    description:
      "SEO, paid ads, branding, strategy, content marketing, and growth-focused digital insights.",
    accent: "text-[#c026d3]",
    softBg: "bg-[#fdf4ff]",
    border: "border-[#f5d0fe]",
    iconBg: "bg-[#c026d3]/10",
  },
  "Home Improvements": {
    description:
      "Renovation ideas, home upgrades, styling, practical repair guides, and improvement inspiration.",
    accent: "text-[#0f766e]",
    softBg: "bg-[#f0fdfa]",
    border: "border-[#99f6e4]",
    iconBg: "bg-[#0f766e]/10",
  },
};

const getCategoryGroups = () => {
  const grouped = new Map<string, BlogPost[]>();

  BLOGS.forEach((blog) => {
    const normalized = normalizeCategory(blog.category);
    if (!normalized) return;

    const current = grouped.get(normalized) || [];
    current.push({
      ...blog,
      category: normalized,
    });
    grouped.set(normalized, current);
  });

  return Array.from(grouped.entries())
    .map(([category, posts]) => {
      const sortedPosts = [...posts].sort((a, b) => {
        const aTime = parseDate(a.publishISO || a.publishDate);
        const bTime = parseDate(b.publishISO || b.publishDate);
        return bTime - aTime;
      });

      return {
        category,
        posts: sortedPosts,
        count: sortedPosts.length,
        latest: sortedPosts[0],
      };
    })
    .sort((a, b) => b.count - a.count);
};

const CategoryPill = ({ category }: { category: string }) => {
  const meta = CATEGORY_META[category] || {
    accent: "text-slate-700",
    softBg: "bg-slate-100",
    border: "border-slate-200",
  };

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${meta.softBg} ${meta.border} ${meta.accent}`}
    >
      {category}
    </span>
  );
};

const CategoryCard = ({
  category,
  count,
  latest,
}: {
  category: string;
  count: number;
  latest?: BlogPost;
}) => {
  const meta = CATEGORY_META[category] || {
    description: "Explore the latest posts in this category.",
    accent: "text-slate-700",
    softBg: "bg-slate-100",
    border: "border-slate-200",
    iconBg: "bg-slate-200",
  };

  const href = `/categories/${slugifyCategory(category)}`;

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#FF5A14] hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
      <div className="p-5 sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <CategoryPill category={category} />
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0B1220]">
              {category}
            </h2>
          </div>

          <div
            className={`flex h-12 min-w-[3rem] items-center justify-center rounded-2xl ${meta.iconBg}`}
          >
            <FolderOpen className={`h-5 w-5 ${meta.accent}`} />
          </div>
        </div>

        <p className="text-[15px] leading-7 text-slate-600">
          {meta.description}
        </p>

        <div className="mt-6 flex items-center gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Articles
            </p>
            <p className="mt-1 text-2xl font-bold text-[#0B1220]">{count}</p>
          </div>

          {latest?.publishDate && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Latest
              </p>
              <p className="mt-1 text-sm font-medium text-slate-600">
                {latest.publishDate}
              </p>
            </div>
          )}
        </div>
      </div>

      {latest && (
        <div className="border-t border-slate-100 bg-slate-50/60 p-4 sm:p-5">
          <div className="grid items-center gap-4 sm:grid-cols-[116px_1fr]">
            <Link
              href={`/blog/${latest.slug}`}
              className="group/image relative block h-[100px] overflow-hidden rounded-xl"
            >
              <Image
                src={latest.heroImage}
                alt={latest.title}
                fill
                unoptimized
                sizes="116px"
                className="object-cover object-center transition duration-500 group-hover/image:scale-[1.05]"
              />
            </Link>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Latest article
              </p>
              <Link
                href={`/blog/${latest.slug}`}
                className="mt-2 block text-[1rem] font-semibold leading-snug text-[#0B1220] transition duration-300 hover:text-[#FF5A14]"
              >
                <span className="line-clamp-2">{latest.title}</span>
              </Link>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <Link
              href={href}
              className="group/link inline-flex items-center gap-2 text-sm font-semibold text-[#FF5A14]"
            >
              Explore category
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>

            <Link
              href={`/blog/${latest.slug}`}
              className="text-sm font-medium text-slate-500 transition hover:text-[#0B1220]"
            >
              Read latest
            </Link>
          </div>
        </div>
      )}
    </article>
  );
};


export default function CategoriesPage() {
  const categories = getCategoryGroups();

  return (
    <main className="mx-auto max-w-[1440px] px-5 py-10 lg:px-8">
      <section className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/sectionicon.svg"
              alt="section icon"
              width={25}
              height={25}
            />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5A14]">
              Categories
            </span>
          </div>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#0B1220] md:text-5xl">
            Explore all categories
          </h1>

          <p className="mt-4 max-w-2xl text-[16px] leading-7 text-slate-600">
            Browse every topic in one place and discover the latest articles,
            practical insights, and editorial picks across all categories.
          </p>
        </div>

        <Link
          href="/blog"
          className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#FF5A14]/30 bg-[#FF5A14]/5 px-5 py-2.5 text-sm font-semibold text-[#FF5A14] transition-all duration-300 hover:bg-[#FF5A14] hover:text-white"
        >
          Browse All Articles
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </section>



      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((item) => (
          <CategoryCard
            key={item.category}
            category={item.category}
            count={item.count}
            latest={item.latest}
          />
        ))}
      </section>
    </main>
  );
}