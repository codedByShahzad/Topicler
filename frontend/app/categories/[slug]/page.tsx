import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
      <section className="border-b border-slate-200 bg-[#fff7f3]">
        <div className="mx-auto max-w-360 px-5 py-16 lg:px-8 lg:py-20">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#FF5A14]">
            Category
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-[#0B1220] md:text-5xl">
            {categoryName}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Explore all articles in the {categoryName} category.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="mx-auto max-w-360 px-5 py-14 lg:px-8 lg:py-16">
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
              priority={index < 3} // 🔥 optimize LCP
            />
          ))}
        </div>
      </section>
    </main>
  );
}