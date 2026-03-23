import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BLOGS } from "@/src/lib/blog";

type BlogPost = (typeof BLOGS)[number];

const ScienceSection = () => {
  const sciencePosts = BLOGS.filter((post) => post.category === "Science").slice(0, 8);

  const featured = sciencePosts[0];
  const middlePosts = sciencePosts.slice(1, 3);
  const sidePosts = sciencePosts.slice(3, 8);

  if (!featured || middlePosts.length < 2 || sidePosts.length < 5) return null;

  return (
    <section className="mx-auto max-w-360 border-t border-slate-200 px-5 py-8 lg:px-8">
      <div className="mb-6 flex items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight text-[#0B1220] md:text-4xl">
          Science
        </h2>

        <Link
          href="/categories/science"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#FF5A14] transition hover:gap-3"
        >
          See Latest
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_1.05fr_1fr] xl:items-stretch">
        {/* Left Featured */}
        <Link href={`/blog/${featured.slug}`} className="group block h-full">
          <article className="grid h-full overflow-hidden border border-slate-200/60 bg-[#f5f5f5] shadow-sm xl:grid-rows-[1fr_auto]">
            <div className="relative min-h-[360px] overflow-hidden xl:min-h-0">
              <Image
                src={featured.heroImage}
                alt={featured.title}
                fill
                unoptimized
                sizes="(max-width: 1280px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-4 md:p-5">
              <h3 className="text-[1.9rem] font-bold leading-tight text-[#0B1220] transition group-hover:text-[#FF5A14] md:text-[2.1rem]">
                {featured.title}
              </h3>

              <p className="mt-3 text-sm text-slate-500">{featured.publishDate}</p>

              <p className="mt-3 line-clamp-2 text-[0.98rem] leading-7 text-slate-600">
                {featured.subtitle}
              </p>
            </div>
          </article>
        </Link>

        {/* Middle two stacked cards */}
        <div className="grid gap-5 xl:h-full xl:grid-rows-2">
          {middlePosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
              <article className="grid h-full overflow-hidden border border-slate-200/60 bg-[#f5f5f5] shadow-sm xl:grid-rows-[1fr_auto]">
                <div className="relative min-h-[200px] overflow-hidden xl:min-h-0">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    unoptimized
                    sizes="(max-width: 1280px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <h4 className="text-[1.1rem] font-semibold leading-snug text-[#0B1220] transition group-hover:text-[#FF5A14] md:text-[1.25rem]">
                    {post.title}
                  </h4>

                  <p className="mt-3 text-sm text-slate-500">{post.publishDate}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Right compact list */}
        <div className="grid gap-4 xl:h-full xl:grid-rows-5">
          {sidePosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
              <article className="grid h-full grid-cols-[140px_1fr] items-stretch overflow-hidden border border-slate-200/60 bg-white shadow-sm transition hover:bg-[#fffaf7] max-sm:grid-cols-1">
                <div className="relative h-full min-h-[92px] overflow-hidden max-sm:h-[150px]">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, 140px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col justify-center p-4">
                  <h5 className="text-[1rem] font-semibold leading-snug text-[#0B1220] transition group-hover:text-[#FF5A14]">
                    {post.title}
                  </h5>

                  <p className="mt-3 text-sm text-slate-500">{post.publishDate}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScienceSection;