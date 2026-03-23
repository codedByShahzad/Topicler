import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BLOGS } from "@/src/lib/blog";

type BlogPost = (typeof BLOGS)[number];

const FinanceSection = () => {
  const financePosts = BLOGS.filter((post) => post.category === "Finance").slice(0, 7);

  const featured = financePosts[0];
  const rightPosts = financePosts.slice(1, 4);
  const bottomPosts = financePosts.slice(4, 7);

  if (!featured || rightPosts.length < 3 || bottomPosts.length < 3) return null;

  return (
    <section className="mx-auto max-w-360 border-t border-slate-200 px-5 py-8 lg:px-8">
      <div className="mb-6 flex items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight text-[#0B1220] md:text-4xl">
          Finance
        </h2>

        <Link
          href="/categories/finance"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#FF5A14] transition hover:gap-3"
        >
          See Latest
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Top Grid */}
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        {/* Left Featured */}
        <Link href={`/blog/${featured.slug}`} className="group block">
          <article className="overflow-hidden border border-slate-200/60 bg-[#f5f5f5] shadow-sm">
            <div className="relative h-[220px] overflow-hidden md:h-[260px]">
              <Image
                src={featured.heroImage}
                alt={featured.title}
                fill
                unoptimized
                sizes="(max-width: 1280px) 100vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-4 md:p-5">
              <h3 className="text-xl font-bold leading-tight text-[#0B1220] transition group-hover:text-[#FF5A14] md:text-[1.7rem]">
                {featured.title}
              </h3>

              <p className="mt-3 text-sm text-slate-500">{featured.publishDate}</p>

              <p className="mt-3 line-clamp-2 text-[0.98rem] leading-7 text-slate-600">
                {featured.subtitle}
              </p>
            </div>
          </article>
        </Link>

        {/* Right List */}
        <div className="space-y-4">
          {rightPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="grid grid-cols-[1fr_150px] items-stretch overflow-hidden border border-slate-200/60 bg-[#f5f5f5] shadow-sm transition hover:bg-[#fffaf7] max-sm:grid-cols-1">
                <div className="flex flex-col justify-center p-4">
                  <h4 className="text-[1.05rem] font-semibold leading-snug text-[#0B1220] transition group-hover:text-[#FF5A14]">
                    {post.title}
                  </h4>

                  <p className="mt-3 text-sm text-slate-500">{post.publishDate}</p>
                </div>

                <div className="relative h-full min-h-[120px] overflow-hidden max-sm:h-[180px]">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, 150px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {bottomPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <article className="relative overflow-hidden border border-slate-200/60 bg-white shadow-sm">
              <div className="relative h-[220px] overflow-hidden">
                <Image
                  src={post.heroImage}
                  alt={post.title}
                  fill
                  unoptimized
                  sizes="(max-width: 1280px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h4 className="line-clamp-2 text-[1rem] font-semibold leading-snug text-white">
                    {post.title}
                  </h4>

                  <p className="mt-2 text-sm text-white/85">{post.publishDate}</p>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FinanceSection;