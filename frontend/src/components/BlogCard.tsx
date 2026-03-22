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
  priority?: boolean; // for above-the-fold images
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
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      {/* Image */}
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <Image
            src={heroImage}
            alt={title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          {/* Category Badge */}
          <div className="absolute left-4 top-4 z-10">
            <span className="rounded-full bg-[#FF5A14]/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              {category}
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Meta */}
        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
          <span className="inline-flex items-center gap-1">
            <CalendarDays size={14} />
            {publishDate}
          </span>

          <span className="inline-flex items-center gap-1">
            <Clock size={14} />
            {readingTime}
          </span>
        </div>

        {/* Title */}
        <Link href={`/blog/${slug}`}>
          <h2 className="text-lg font-bold leading-snug text-[#0B1220] transition group-hover:text-[#FF5A14] md:text-xl">
            {title}
          </h2>
        </Link>

        {/* Subtitle */}
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {subtitle}
        </p>

        {/* Read More */}
        <Link
          href={`/blog/${slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#FF5A14] transition-all duration-200 group-hover:gap-3"
        >
          Read article
          <ArrowUpRight size={16} />
        </Link>
      </div>

      {/* Glow Effect */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#FF5A14]/5 via-transparent to-[#FF5A14]/5" />
      </div>
    </article>
  );
}