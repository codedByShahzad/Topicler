"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { BLOGS } from "../../src/lib/blog";
import BlogCard from "@/src/components/BlogCard";
import { Folder } from "lucide-react";

function GridBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(11,18,32,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,18,32,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="absolute left-0 top-0 h-full w-[50%] bg-gradient-to-r from-[#FF5A14]/10 via-transparent to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white" />
    </div>
  );
}

export default function BlogListClient() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.trim() || "";

  const filteredBlogs = useMemo(() => {
    if (!searchQuery) return BLOGS;

    const normalizedQuery = searchQuery.toLowerCase();

    return BLOGS.filter((blog) => {
      const title = blog.title?.toLowerCase() || "";
      const subtitle = blog.subtitle?.toLowerCase() || "";
      const category = blog.category?.toLowerCase() || "";

      return (
        title.includes(normalizedQuery) ||
        subtitle.includes(normalizedQuery) ||
        category.includes(normalizedQuery)
      );
    });
  }, [searchQuery]);

  return (
    <div className="relative min-h-[92vh] overflow-hidden bg-white px-4 py-10 md:px-6 md:py-16">
      <GridBackground />

      <div className="mx-auto max-w-360">
        <div className="mx-auto max-w-3xl text-center">

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#0B1220] md:text-5xl">
            {searchQuery ? (
              <>
                Search Results for{" "}
                <span className="text-[#FF5A14]">“{searchQuery}”</span>
              </>
            ) : (
              <>
                Explore Our <span className="text-[#FF5A14]">Blogs</span>
              </>
            )}
          </h1>

          <p className="mt-4 leading-relaxed text-slate-600">
            {searchQuery
              ? "Browse all articles related to your search."
              : "Discover high-quality articles designed to be simple, practical, and easy to understand."}
          </p>

          <p className="mt-4 text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-[#0B1220]">
              {filteredBlogs.length}
            </span>{" "}
            result{filteredBlogs.length === 1 ? "" : "s"}
            {searchQuery ? (
              <>
                {" "}
                for{" "}
                <span className="font-semibold text-[#FF5A14]">
                  “{searchQuery}”
                </span>
              </>
            ) : (
              <>
                {" "}
                out of{" "}
                <span className="font-semibold text-[#0B1220]">
                  {BLOGS.length}
                </span>{" "}
                post{BLOGS.length === 1 ? "" : "s"}
              </>
            )}
          </p>
        </div>

        {filteredBlogs.length > 0 ? (
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredBlogs.map((blog, index) => (
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
        ) : (
          <div className="mt-14 rounded-3xl border border-slate-200 bg-white/80 px-6 py-16 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-[#0B1220]">
              No blogs found
            </h2>
            <p className="mt-3 text-slate-600">
              No articles matched{" "}
              <span className="font-semibold text-[#FF5A14]">
                “{searchQuery}”
              </span>
              . Try another keyword.
            </p>
          </div>
        )}

        <p className="mt-12 text-center text-sm text-slate-500">
          Topicler blogs are crafted for clarity, speed, and real-world value.
        </p>
      </div>
    </div>
  );
}