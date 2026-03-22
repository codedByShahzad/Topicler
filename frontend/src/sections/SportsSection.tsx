import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BLOGS } from "@/src/lib/blog";

type BlogPost = (typeof BLOGS)[number];

const SportsSection = () => {
  const sportsPosts = BLOGS.filter((post) => post.category === "Sport").slice(0, 7);

  const leftPosts = sportsPosts.slice(0, 3);
  const middlePosts = sportsPosts.slice(3, 6);
  const featured = sportsPosts[6];

  if (leftPosts.length < 3 || middlePosts.length < 3 || !featured) return null;

  return (
    <section className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-8 lg:px-8">
      <div className="mb-6 flex items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight text-[#0B1220] md:text-4xl">
          Sport
        </h2>

        <Link
          href="/categories/sport"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#FF5A14] transition hover:gap-3"
        >
          See Latest
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_1fr_1.2fr]">
        {/* Left column */}
        <div className="space-y-5">
          {leftPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="grid grid-cols-[150px_1fr] items-stretch gap-4 max-sm:grid-cols-1">
                <div className="relative min-h-[120px] overflow-hidden border border-slate-200/60">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, 150px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <h4 className="text-[1.1rem] font-semibold leading-snug text-[#0B1220] transition group-hover:text-[#FF5A14] md:text-[1.2rem]">
                    {post.title}
                  </h4>
                  <p className="mt-4 text-sm text-slate-500">{post.publishDate}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Middle column */}
        <div className="space-y-5">
          {middlePosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="grid grid-cols-[150px_1fr] items-stretch gap-4 max-sm:grid-cols-1">
                <div className="relative min-h-[120px] overflow-hidden border border-slate-200/60">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, 150px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <h4 className="text-[1.1rem] font-semibold leading-snug text-[#0B1220] transition group-hover:text-[#FF5A14] md:text-[1.2rem]">
                    {post.title}
                  </h4>
                  <p className="mt-4 text-sm text-slate-500">{post.publishDate}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Right featured */}
        <Link href={`/blog/${featured.slug}`} className="group block">
          <article className="overflow-hidden border border-slate-200/60 bg-[#f5f5f5] shadow-sm">
            <div className="relative h-[300px] overflow-hidden md:h-[380px]">
              <Image
                src={featured.heroImage}
                alt={featured.title}
                fill
                unoptimized
                sizes="(max-width: 1280px) 100vw, 40vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-5 md:p-6">
              <h3 className="text-[1.9rem] font-bold leading-tight text-[#0B1220] transition group-hover:text-[#FF5A14] md:text-[2.05rem]">
                {featured.title}
              </h3>

              <p className="mt-4 text-sm text-slate-500">{featured.publishDate}</p>
            </div>
          </article>
        </Link>
      </div>
    </section>
  );
};

export default SportsSection;