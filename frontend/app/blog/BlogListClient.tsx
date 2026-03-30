"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { BLOGS } from "../../src/lib/blog";
import BlogCard from "@/src/components/BlogCard";

function GridBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(11,18,32,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,18,32,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />
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
    <div className="relative min-h-[92vh] overflow-hidden bg-white ">
      <GridBackground />

      <div className="mx-auto max-w-360 px-5 py-6 lg:px-8">
        {/* SIMPLE HEADER */}
        <section className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/sectionicon.svg"
                alt="section icon"
                width={24}
                height={24}
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5A14]">
                {searchQuery ? "Search Results" : "Blog Directory"}
              </span>
            </div>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#0B1220] md:text-5xl">
              {searchQuery ? (
                <>
                  Results for <span className="text-[#FF5A14]">“{searchQuery}”</span>
                </>
              ) : (
                <>
                  Explore all <span className="text-[#FF5A14]">blogs</span>
                </>
              )}
            </h1>

            <p className="mt-4 max-w-2xl text-[16px] leading-7 text-slate-600">
              {searchQuery
                ? "Browse articles related to your search and discover relevant insights across categories."
                : "Discover clear, practical, and modern articles across all categories in one place."}
            </p>
          </div>


        </section>

        {/* RESULT INFO */}
        <section className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              {searchQuery ? "Matched articles" : "All articles"}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0B1220] md:text-3xl">
              {searchQuery ? "Relevant posts" : "Latest posts"}
            </h2>
          </div>

          <div className="">
            {/* <Search className="h-4 w-4 text-[#FF5A14]" /> */}
            <span>
              {filteredBlogs.length} result{filteredBlogs.length === 1 ? "" : "s"}
              {searchQuery ? (
                <>
                  {" "}
                  for <span className="font-semibold text-[#FF5A14]">“{searchQuery}”</span>
                </>
              ) : (
                <>
                  {" "}
                  from <span className="font-semibold text-[#0B1220]">{BLOGS.length}</span> posts
                </>
              )}
            </span>
          </div>
        </section>

        {/* GRID / EMPTY */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
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
          <div className="rounded-[24px] border border-slate-200 bg-white px-6 py-16 text-center shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FF5A14]/10">
              <Search className="h-6 w-6 text-[#FF5A14]" />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-[#0B1220]">
              No blogs found
            </h2>

            <p className="mt-3 text-slate-600">
              No articles matched{" "}
              <span className="font-semibold text-[#FF5A14]">“{searchQuery}”</span>.
              Try another keyword.
            </p>

            <div className="mt-6">
              <Link
                href="/blog"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#FF5A14]/30 bg-[#FF5A14]/5 px-5 py-3 text-sm font-semibold text-[#FF5A14] transition-all duration-300 hover:bg-[#FF5A14] hover:text-white"
              >
                Browse All Blogs
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        )}

        <p className="mt-12 text-center text-sm text-slate-500">
          Topicler blogs are built for clarity, speed, and practical value.
        </p>
      </div>
    </div>
  );
}