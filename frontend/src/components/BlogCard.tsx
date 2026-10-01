import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import type { StaticImageData } from "next/image";

/* -------------------------------------------------------------------------- */
/*                                  TYPES                                     */
/* -------------------------------------------------------------------------- */

type BlogCardProps = {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string | StaticImageData;
  category: string;
  publishDate: string;
  readingTime?: string;
  priority?: boolean;
};

/* -------------------------------------------------------------------------- */
/*                              DATE HELPERS                                  */
/* -------------------------------------------------------------------------- */

function formatDate(dateString?: string) {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/* -------------------------------------------------------------------------- */
/*                              IMAGE HELPERS                                 */
/* -------------------------------------------------------------------------- */

function optimizeImage(
  image: string | StaticImageData
): string | StaticImageData {
  if (typeof image !== "string") {
    return image;
  }

  if (
    !image.includes("res.cloudinary.com") ||
    !image.includes("/image/upload/")
  ) {
    return image;
  }

  if (
    image.includes("f_auto") ||
    image.includes("q_auto")
  ) {
    return image;
  }

  return image.replace(
    "/image/upload/",
    "/image/upload/f_auto,q_auto,w_900/"
  );
}

/* -------------------------------------------------------------------------- */
/*                              CATEGORY                                      */
/* -------------------------------------------------------------------------- */

const normalizeCategory = (
  category?: string
) => {
  if (!category) return "";

  const value = category
    .trim()
    .toLowerCase();

  if (value.includes("politic")) {
    return "Politics";
  }

  if (value.includes("finance")) {
    return "Finance";
  }

  if (value.includes("real estate")) {
    return "Real Estate";
  }

  if (
    value.includes("technology") ||
    value.includes("tech")
  ) {
    return "Technology";
  }

  if (value.includes("plumbing")) {
    return "Plumbing";
  }

  if (value.includes("digital")) {
    return "Digital Marketing";
  }

  if (value.includes("home")) {
    return "Home Improvements";
  }

  if (value.includes("health")) {
    return "Health";
  }

  return category.trim();
};

/* -------------------------------------------------------------------------- */
/*                            CATEGORY STYLES                                 */
/* -------------------------------------------------------------------------- */

const categoryStyles: Record<
  string,
  string
> = {
  "Topic Ideas":
    "border-red-200 bg-red-50 text-red-600",

  "":
    "border-blue-200 bg-blue-50 text-blue-600",

  "Idea Generation":
    "border-amber-200 bg-amber-50 text-amber-700",

  Conversation:
    "border-violet-200 bg-violet-50 text-violet-600",

  "SEO & Content":
    "border-cyan-200 bg-cyan-50 text-cyan-700",

  Productivity:
    "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-600",

  "Topicler Guides":
    "border-emerald-200 bg-emerald-50 text-emerald-700",
};

/* -------------------------------------------------------------------------- */
/*                           CATEGORY PILL                                    */
/* -------------------------------------------------------------------------- */

function CategoryPill({
  category,
}: {
  category: string;
}) {
  const normalizedCategory =
    normalizeCategory(category);

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] shadow-sm backdrop-blur-md ${
        categoryStyles[
          normalizedCategory
        ] ||
        "border-white/40 bg-white/90 text-slate-700"
      }`}
    >
      {normalizedCategory}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                              BLOG CARD                                     */
/* -------------------------------------------------------------------------- */

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
  const normalizedCategory =
    normalizeCategory(category);

  const formattedDate =
    formatDate(publishDate);

  const optimizedImage =
    optimizeImage(heroImage);

  /*
   * Solvix may not have readingTime on every existing blog.
   * Always provide a readable fallback.
   */
  const formattedReadingTime =
    readingTime?.trim() || "5 min read";

  return (
    <article
      className="
        group relative flex h-full flex-col
        overflow-hidden rounded-2xl
        border border-slate-200/80
        bg-white
        shadow-[0_8px_30px_rgba(15,23,42,0.05)]
        transition-all duration-300
        hover:-translate-y-1
        hover:border-[#FF5A14]/30
        hover:shadow-[0_20px_50px_rgba(15,23,42,0.10)]
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* IMAGE                                                              */}
      {/* ------------------------------------------------------------------ */}

      <Link
        href={`/blogs/${slug}`}
        className="block"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">

          <Image
            src={optimizedImage}
            alt={title}
            fill
            priority={priority}
            quality={70}
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              33vw
            "
            className="
              object-cover object-center
              transition-transform duration-700
              ease-out
              group-hover:scale-[1.05]
            "
          />

          {/* Image overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

          {/* Category */}

          <div className="absolute left-4 top-4 z-10">
            <CategoryPill
              category={normalizedCategory}
            />
          </div>

          {/* Bottom image glow */}

          <div
            className="
              pointer-events-none absolute
              bottom-0 left-0 right-0 h-24
              bg-gradient-to-t
              from-black/20 to-transparent
              opacity-80
            "
          />
        </div>
      </Link>

      {/* ------------------------------------------------------------------ */}
      {/* CONTENT                                                            */}
      {/* ------------------------------------------------------------------ */}

      <div className="flex flex-1 flex-col p-5 sm:p-6">

        {/* ---------------------------------------------------------------- */}
        {/* META                                                              */}
        {/* ---------------------------------------------------------------- */}

        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500">

          {/* DATE */}

          {formattedDate && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays
                size={14}
                strokeWidth={1.8}
                className="text-[#FF5A14]"
              />

              <span>
                {formattedDate}
              </span>
            </span>
          )}

          {/* READING TIME */}

          <span className="inline-flex items-center gap-1.5">
            <Clock
              size={14}
              strokeWidth={1.8}
              className="text-[#FF5A14]"
            />

            <span>
              {formattedReadingTime}
            </span>
          </span>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* TITLE                                                             */}
        {/* ---------------------------------------------------------------- */}

        <Link
          href={`/blogs/${slug}`}
          className="block"
        >
          <h2
            className="
              line-clamp-2
              text-[1.08rem]
              font-bold
              leading-snug
              tracking-[-0.01em]
              text-[#0B1220]
              transition-colors
              duration-300
              group-hover:text-[#FF5A14]
              md:text-[1.2rem]
            "
          >
            {title}
          </h2>
        </Link>

        {/* ---------------------------------------------------------------- */}
        {/* DESCRIPTION                                                       */}
        {/* ---------------------------------------------------------------- */}

        <p
          className="
            mt-3
            line-clamp-3
            text-[14px]
            leading-7
            text-slate-600
          "
        >
          {subtitle}
        </p>

        {/* ---------------------------------------------------------------- */}
        {/* FOOTER                                                            */}
        {/* ---------------------------------------------------------------- */}

        <div
          className="
            mt-auto
            flex items-center
            justify-between
            border-t border-slate-100
            pt-5
            mt-6
          "
        >
          <Link
            href={`/blogs/${slug}`}
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-[#FF5A14]
              transition-all
              duration-300
              group-hover:gap-3
            "
          >
            Read article

          </Link>

          {/* Small visual indicator */}

          <span
            className="
              flex h-8 w-8
              items-center justify-center
              rounded-full
              bg-[#FFF4EE]
              text-[#FF5A14]
              transition-all
              duration-300
              group-hover:bg-[#FF5A14]
              group-hover:text-white
            "
          >
            <ArrowUpRight
              size={14}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* SUBTLE HOVER BORDER                                                */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          pointer-events-none
          absolute inset-0
          rounded-2xl
          border border-[#FF5A14]/0
          transition-all duration-300
          group-hover:border-[#FF5A14]/10
        "
      />
    </article>
  );
}