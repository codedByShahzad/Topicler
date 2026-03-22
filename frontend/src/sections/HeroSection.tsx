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

const getLatestUniqueCategoryBlogs = (excludeSlug?: string) => {
  const sorted = getSortedBlogs();
  const seen = new Set<string>();
  const result: BlogPost[] = [];

  for (const blog of sorted) {
    if (blog.slug === excludeSlug) continue;
    if (seen.has(blog.category)) continue;

    seen.add(blog.category);
    result.push(blog);
  }

  return result;
};

const CategoryLabel = ({ text }: { text: string }) => (
  <span className="text-xs font-medium text-[#FF5A14]">{text}</span>
);

const DateText = ({ text }: { text: string }) => (
  <p className="mt-2 text-xs text-slate-500">{text}</p>
);

const BigFeaturedCard = ({ post }: { post: BlogPost }) => (
  <Link href={`/blog/${post.slug}`} className="group block">
    <article className="overflow-hidden bg-[#f5f5f5] shadow-sm">
      <div className="relative h-[210px] overflow-hidden md:h-[260px] xl:h-[300px]">
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          unoptimized
          sizes="(max-width: 1280px) 100vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4 md:p-5">
        <CategoryLabel text={post.category} />

        <h2 className="mt-2 text-[1.9rem] font-bold leading-tight text-[#0B1220] transition group-hover:text-[#FF5A14] md:text-[2.1rem]">
          {post.title}
        </h2>

        <DateText text={post.publishDate} />
      </div>
    </article>
  </Link>
);

const TopCard = ({ post }: { post: BlogPost }) => (
  <Link href={`/blog/${post.slug}`} className="group block">
    <article className="overflow-hidden bg-white">
      <div className="relative h-[130px] overflow-hidden md:h-[150px] xl:h-[165px]">
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          unoptimized
          sizes="(max-width: 1280px) 100vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="pt-3">
        <CategoryLabel text={post.category} />

        <h3 className="mt-2 text-[1.15rem] font-bold leading-snug text-[#0B1220] transition group-hover:text-[#FF5A14] md:text-[1.45rem]">
          {post.title}
        </h3>

        <DateText text={post.publishDate} />
      </div>
    </article>
  </Link>
);

const SmallBottomCard = ({ post }: { post: BlogPost }) => (
  <Link href={`/blog/${post.slug}`} className="group block">
    <article className="overflow-hidden bg-white">
      <div className="relative h-[88px] overflow-hidden md:h-[95px] xl:h-[105px]">
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          unoptimized
          sizes="(max-width: 1280px) 100vw, 16vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="pt-3">
        <CategoryLabel text={post.category} />

        <h4 className="mt-2 text-[0.95rem] font-semibold leading-snug text-[#0B1220] transition group-hover:text-[#FF5A14]">
          {post.title}
        </h4>

        <DateText text={post.publishDate} />
      </div>
    </article>
  </Link>
);

const SideHorizontalCard = ({ post }: { post: BlogPost }) => (
  <Link href={`/blog/${post.slug}`} className="group block">
    <article className="grid grid-cols-[150px_1fr] overflow-hidden bg-[#f5f5f5] max-sm:grid-cols-1">
      <div className="relative h-[90px] max-sm:h-[140px]">
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, 150px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col justify-center p-4">
        <h4 className="text-[0.98rem] font-semibold leading-snug text-[#0B1220] transition group-hover:text-[#FF5A14]">
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
    <section className="mx-auto max-w-7xl px-5 py-6 lg:px-8">
      <div className="mb-5 flex items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-[#0B1220] md:text-4xl">
          Latest Update
        </h1>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#FF5A14] transition hover:gap-3"
        >
          Editor&apos;s Picks
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left */}
        <div className="lg:col-span-6">
          <BigFeaturedCard post={featured} />

          {bottomLeft.length > 0 && (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {bottomLeft.map((post) => (
                <SmallBottomCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* Right */}
        <div className="lg:col-span-6">
          {topRight.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2">
              {topRight.map((post) => (
                <TopCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          {rightList.length > 0 && (
            <div className="mt-5 space-y-4">
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