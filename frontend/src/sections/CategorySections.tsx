import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BLOGS } from "@/src/lib/blog";

type BlogPost = (typeof BLOGS)[number];

const slugifyCategory = (value: string) =>
  value.toLowerCase().trim().replace(/\s+/g, "-");

const formatCategoryTitle = (value: string) => value;

const CategoryHeader = ({ title }: { title: string }) => (
  <div className="mb-8 flex items-center gap-4">
    <h2 className="text-3xl font-bold tracking-tight text-[#0B1220] md:text-4xl">
      {formatCategoryTitle(title)}
    </h2>

    <Link
      href={`/categories/${slugifyCategory(title)}`}
      className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#FF5A14] transition hover:gap-3"
    >
      See Latest
      <ArrowRight className="h-4 w-4" />
    </Link>
  </div>
);

const OverlayCard = ({ post }: { post: BlogPost }) => (
  <Link
    href={`/blog/${post.slug}`}
    className="group relative block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
  >
    <div className="relative h-[300px] md:h-[420px]">
      <Image
        src={post.heroImage}
        alt={post.title}
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <h3 className="max-w-xl text-3xl font-bold leading-tight text-white md:text-[2.15rem]">
          {post.title}
        </h3>
        <p className="mt-3 text-sm text-white/80">{post.publishDate}</p>
      </div>
    </div>
  </Link>
);

const FeaturedCard = ({ post }: { post: BlogPost }) => (
  <Link
    href={`/blog/${post.slug}`}
    className="group block overflow-hidden rounded-3xl border border-slate-200 bg-[#f6f6f6] shadow-sm transition hover:shadow-lg"
  >
    <div className="relative h-[260px] overflow-hidden">
      <Image
        src={post.heroImage}
        alt={post.title}
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
      />
    </div>

    <div className="p-5">
      <h3 className="text-[1.9rem] font-bold leading-tight text-[#0B1220] transition group-hover:text-[#FF5A14]">
        {post.title}
      </h3>

      <p className="mt-3 text-sm text-slate-500">{post.publishDate}</p>

      <p className="mt-4 line-clamp-3 text-[1.05rem] leading-8 text-slate-600">
        {post.subtitle}
      </p>
    </div>
  </Link>
);

const SideListItem = ({ post }: { post: BlogPost }) => (
  <Link
    href={`/blog/${post.slug}`}
    className="group grid grid-cols-[140px_1fr] items-start gap-5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-[#FF5A14]/30 hover:bg-[#FFF4EE] max-sm:grid-cols-1"
  >
    <div className="relative h-[96px] overflow-hidden rounded-xl max-sm:h-[180px]">
      <Image
        src={post.heroImage}
        alt={post.title}
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
      />
    </div>

    <div>
      <h4 className="text-[1.45rem] font-semibold leading-snug text-[#0B1220] transition group-hover:text-[#FF5A14]">
        {post.title}
      </h4>
      <p className="mt-3 text-sm text-slate-500">{post.publishDate}</p>
    </div>
  </Link>
);

const CategoryBlock = ({
  category,
  posts,
  variant = "default",
}: {
  category: string;
  posts: BlogPost[];
  variant?: "default" | "overlay";
}) => {
  if (posts.length < 5) return null;

  const mainPost = posts[0];
  const secondaryPost = posts[1];
  const sidePosts = posts.slice(2, 5);

  return (
    <section className="border-t border-slate-200 pt-10">
      <CategoryHeader title={category} />

      <div className="grid gap-8 xl:grid-cols-12">
        <div className="xl:col-span-7">
          {variant === "overlay" ? (
            <OverlayCard post={mainPost} />
          ) : (
            <FeaturedCard post={mainPost} />
          )}
        </div>

        <div className="xl:col-span-5">
          <div className="space-y-5">
            {secondaryPost && <SideListItem post={secondaryPost} />}
            {sidePosts.map((post) => (
              <SideListItem key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CategorySections = () => {
  const desiredCategories = ["Health", "Finance", "Technology"];

  const categoryData = desiredCategories
    .map((category) => ({
      category,
      posts: BLOGS.filter((blog) => blog.category === category).slice(0, 5),
    }))
    .filter((item) => item.posts.length > 0);

  return (
    <section className="mx-auto max-w-360 px-5 py-6 lg:px-8">
      <div className="space-y-14">
        {categoryData.map((item, index) => (
          <CategoryBlock
            key={item.category}
            category={item.category}
            posts={item.posts}
            variant={index === 0 ? "overlay" : "default"}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySections;