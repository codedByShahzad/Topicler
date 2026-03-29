import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { BLOGS } from "@/src/lib/blog";
import BlogCard from "@/src/components/BlogCard";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function slugifyCategory(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, "-");
}

function getBlogsByCategorySlug(slug: string) {
  return BLOGS.filter((blog) => slugifyCategory(blog.category) === slug);
}

export function generateStaticParams() {
  const uniqueCategories = Array.from(
    new Set(BLOGS.map((blog) => blog.category))
  );

  return uniqueCategories.map((category) => ({
    slug: slugifyCategory(category),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blogs = getBlogsByCategorySlug(slug);

  if (!blogs.length) {
    return {
      title: "Category Not Found | Topicler",
      description: "The requested category could not be found.",
    };
  }

  const categoryName = blogs[0].category;

  return {
    title: `${categoryName} Blogs | Topicler`,
    description: `Browse all ${categoryName} blogs and articles on Topicler.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const blogs = getBlogsByCategorySlug(slug);

  if (!blogs.length) {
    notFound();
  }

  const categoryName = blogs[0].category;

  return (
    <main className="min-h-screen bg-white">
   {/* Header */}
<section className="relative overflow-hidden border-b border-slate-200 bg-[#fcfcfd]">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,90,20,0.10),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.04),transparent_24%)]" />

  <div className="relative mx-auto max-w-[1440px] px-5 py-14 lg:px-8 lg:py-10">
    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <div className="mb-5 flex items-center gap-3">
          <Image
            src="/images/sectionicon.svg"
            alt="section icon"
            width={24}
            height={24}
          />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5A14]">
            Category
          </span>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <Link href="/" className="transition hover:text-[#0B1220]">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/categories"
            className="transition hover:text-[#0B1220]"
          >
            Categories
          </Link>
          <span>/</span>
          <span className="font-medium text-[#0B1220]">{categoryName}</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-[#0B1220] md:text-5xl lg:text-6xl lg:leading-[1.02]">
          {categoryName}
        </h1>

        <p className="mt-5 max-w-2xl text-[16px] leading-8 text-slate-600 md:text-[17px]">
          Explore all articles, ideas, and practical insights in the{" "}
          {categoryName} category on Topicler.
        </p>

        {/* 📊 Stats */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-white px-8 py-2 shadow-md border border-slate-200">
            <span className="text-lg font-bold text-[#FF5A14]">
              {blogs.length}
            </span>
            <span className="text-sm text-slate-600">
              article{blogs.length === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/blog"
          className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#FF5A14]/30 bg-[#FF5A14]/5 px-6 py-3 text-sm font-semibold text-[#FF5A14] transition-all duration-300 hover:bg-[#FF5A14] hover:text-white"
        >
          Browse All Blogs
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  </div>
</section>
      {/* Blog Grid */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 lg:px-8 lg:py-16">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Latest in {categoryName}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0B1220] md:text-3xl">
              Articles and insights
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog, index) => (
            <BlogCard
              key={blog.slug}
              slug={blog.slug}
              title={blog.title}
              subtitle={blog.subtitle}
              heroImage={blog.heroImage}
              category={blog.category}
              publishDate={blog.publishDate}
              readingTime={blog.readingTime}
              priority={index < 3}
            />
          ))}
        </div>
      </section>
    </main>
  );
}