"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { BLOGS } from "../../src/lib/blog";
import BlogCard from "@/src/components/BlogCard";

function GridBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(11,18,32,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,18,32,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Soft orange glow */}
      <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#FF5A14]/[0.055] blur-3xl" />

      <div className="absolute -right-40 top-20 h-[380px] w-[380px] rounded-full bg-[#FF5A14]/[0.045] blur-3xl" />

      {/* White fade */}
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
    <div className="relative min-h-[92vh] overflow-hidden bg-white">
      <GridBackground />

      {/* =========================================================
          HERO / RESOURCE HEADER
      ========================================================= */}
      <section className="relative  overflow-hidden border-y border-[#FFE0D0] bg-[#FFF4EE] ">
        {/* Decorative orange glow */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#FF5A14]/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-[#FF5A14]/[0.07] blur-3xl" />

        {/* Decorative circles */}
        <div className="pointer-events-none absolute right-[8%] top-10 hidden h-24 w-24 rounded-full border border-[#FF5A14]/10 lg:block" />

        <div className="pointer-events-none absolute bottom-8 left-[7%] hidden h-14 w-14 rounded-full border border-[#FF5A14]/10 lg:block" />

        {/* Hero Content */}
        <div className="relative mx-auto max-w-360 px-5 py-6 text-center sm:py-20 lg:px-8 lg:py-14">
          {/* Eyebrow */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD5C2] bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
              <Image
                src="/images/sectionicon.svg"
                alt="section icon"
                width={18}
                height={18}
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#FF5A14] sm:text-[11px]">
                {searchQuery ? "Search Results" : "Topicler Resources"}
              </span>
            </div>
          </div>

          {/* Heading — KEPT EXACTLY THE SAME */}
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-[#0B1220] sm:text-5xl lg:text-[58px]">
            Explore our{" "}
            <span className="text-[#FF5A14]">
              resources
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-[17px] sm:leading-8">
            Explore practical guides, ideas, and insights designed to help you
            get more from Topicler&apos;s tools.
          </p>
        </div>
      </section>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <div className="mx-auto max-w-360 px-5 py-10 lg:px-8 lg:py-12">

        {/* RESULTS HEADER */}
        <section className="mb-8 flex flex-col gap-5 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              {searchQuery
                ? "Matching resources"
                : "Explore the collection"}
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0B1220] md:text-3xl">
              {searchQuery
                ? "Relevant resources"
                : "Latest resources"}
            </h2>
          </div>

          {/* Result count */}
          <div className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 shadow-sm">
            <span className="font-semibold text-[#0B1220]">
              {filteredBlogs.length}
            </span>

            <span className="ml-1">
              {filteredBlogs.length === 1
                ? "result"
                : "results"}
            </span>

            {searchQuery && (
              <>
                <span className="mx-2 text-slate-300">•</span>

                <span className="max-w-[180px] truncate font-medium text-[#FF5A14]">
                  {searchQuery}
                </span>
              </>
            )}

            {!searchQuery && (
              <>
                <span className="mx-2 text-slate-300">from</span>

                <span className="font-semibold text-[#0B1220]">
                  {BLOGS.length}
                </span>

                <span className="ml-1">
                  resources
                </span>
              </>
            )}
          </div>
        </section>

        {/* =========================================================
            RESOURCE GRID / EMPTY STATE
        ========================================================= */}
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
          <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white px-6 py-20 text-center shadow-[0_15px_50px_rgba(15,23,42,0.05)]">

            {/* Empty state glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[#FF5A14]/10 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#FFDCCC] bg-[#FFF4EE]">
                <Search className="h-6 w-6 text-[#FF5A14]" />
              </div>

              <h2 className="mt-6 text-2xl font-bold tracking-tight text-[#0B1220]">
                No resources found
              </h2>

              <p className="mx-auto mt-3 max-w-md text-[15px] leading-7 text-slate-600">
                No resources matched{" "}
                <span className="font-semibold text-[#FF5A14]">
                  “{searchQuery}”
                </span>
                . Try searching for another topic or keyword.
              </p>

              <div className="mt-7">
                <Link
                  href="/blog"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FF5A14] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e94f0d] hover:shadow-lg"
                >
                  Explore All Resources

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Bottom message */}
        <div className="mt-14 flex items-center justify-center gap-2 text-center">
          <Sparkles className="h-4 w-4 shrink-0 text-[#FF5A14]" />

          <p className="text-sm text-slate-500">
            Practical resources to help you discover ideas and get more from
            Topicler.
          </p>
        </div>
      </div>
    </div>
  );
}