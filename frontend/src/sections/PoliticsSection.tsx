import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BLOGS } from "@/src/lib/blog";

type BlogPost = (typeof BLOGS)[number];

const PoliticsSection = () => {
  const politicsPosts = BLOGS.filter((post) => post.category === "Politics").slice(0, 6);

  const featured = politicsPosts[0];
  const secondary = politicsPosts[1];
  const sidePosts = politicsPosts.slice(2, 6);

  if (!featured || !secondary || sidePosts.length < 4) return null;

  return (
    <section className="mx-auto max-w-360 border-t border-slate-200 px-5 py-10 lg:px-8">
      <div className="mb-8 flex items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight text-[#0B1220] md:text-5xl">
          Politics
        </h2>

        <Link
          href="/categories/politics"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#FF5A14] transition hover:gap-3"
        >
          See Latest
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_1fr_0.95fr] xl:items-stretch">
        {/* LEFT CARD */}
        <Link href={`/blog/${featured.slug}`} className="group block h-full">
          <article className="grid h-full min-h-[640px] overflow-hidden border border-slate-200/50 bg-white shadow-sm">
            <div className="relative h-full min-h-[640px] overflow-hidden">
              <Image
                src={featured.heroImage}
                alt={featured.title}
                fill
                priority
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="max-w-md text-3xl font-bold leading-tight text-white md:text-[2.15rem]">
                  {featured.title}
                </h3>
                <p className="mt-4 text-sm text-white/85">{featured.publishDate}</p>
              </div>
            </div>
          </article>
        </Link>

        {/* CENTER CARD */}
        <Link href={`/blog/${secondary.slug}`} className="group block h-full">
          <article className="grid h-full min-h-[640px] grid-rows-[360px_1fr] overflow-hidden border border-slate-200/50 bg-[#f5f5f5] shadow-sm">
            <div className="relative overflow-hidden">
              <Image
                src={secondary.heroImage}
                alt={secondary.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col p-6">
              <h3 className="text-2xl font-bold leading-tight text-[#0B1220] transition group-hover:text-[#FF5A14] md:text-[2rem]">
                {secondary.title}
              </h3>

              <p className="mt-4 text-sm text-slate-500">{secondary.publishDate}</p>

              <p className="mt-5 line-clamp-4 text-[1.02rem] leading-8 text-slate-600">
                {secondary.subtitle}
              </p>
            </div>
          </article>
        </Link>

        {/* RIGHT COLUMN */}
        <div className="grid gap-4 xl:grid-rows-4">
          {sidePosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block h-full"
            >
              <article className="grid h-full grid-cols-[150px_1fr] items-stretch border border-slate-200/50 bg-white shadow-sm transition hover:bg-[#fffaf7] max-sm:grid-cols-1">
                <div className="relative h-full min-h-[145px] overflow-hidden">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col justify-center p-5">
                  <h4 className="text-[1.1rem] font-semibold leading-snug text-[#0B1220] transition group-hover:text-[#FF5A14]">
                    {post.title}
                  </h4>

                  <p className="mt-4 text-sm text-slate-500">{post.publishDate}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PoliticsSection;