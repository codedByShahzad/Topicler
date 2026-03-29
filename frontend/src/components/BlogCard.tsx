import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, ArrowUpRight } from "lucide-react";

type BlogCardProps = {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  category: string;
  publishDate: string;
  readingTime: string;
  priority?: boolean;
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

const CategoryPill = ({ category }: { category: string }) => {
  const normalizedCategory = normalizeCategory(category);

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
        categoryStyles[normalizedCategory] ||
        "border-slate-200 bg-slate-50 text-slate-700"
      }`}
    >
      {normalizedCategory}
    </span>
  );
};

export default function BlogCard({
  slug,
  title,
  subtitle,
  heroImage,
  category,
  publishDate,
  readingTime,
  priority = false,
}: BlogCardProps) {
  const normalizedCategory = normalizeCategory(category);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#FF5A14] hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <Image
            src={heroImage}
            alt={title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover object-center transition duration-700 group-hover:scale-[1.05]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          <div className="absolute left-4 top-4 z-10">
            <CategoryPill category={normalizedCategory} />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-[12px] font-medium text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={14} className="text-slate-400" />
            {publishDate}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} className="text-slate-400" />
            {readingTime}
          </span>
        </div>

        <Link href={`/blog/${slug}`}>
          <h2 className="text-[1.08rem] font-bold leading-snug text-[#0B1220] transition duration-300 group-hover:text-[#FF5A14] md:text-[1.22rem]">
            {title}
          </h2>
        </Link>

        <p className="mt-3 line-clamp-3 text-[14px] leading-7 text-slate-600">
          {subtitle}
        </p>

        <div className="mt-auto pt-5">
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF5A14] transition-all duration-200 group-hover:gap-3"
          >
            Read article
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-[24px] bg-gradient-to-r from-[#FF5A14]/[0.04] via-transparent to-[#FF5A14]/[0.04]" />
      </div>
    </article>
  );
}