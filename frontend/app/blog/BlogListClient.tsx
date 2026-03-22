"use client";

import React from "react";
import { BLOGS } from "../../src/lib/blog";
import BlogCard from "@/src/components/BlogCard";
import { Folder } from "lucide-react";

function GridBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(11,18,32,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,18,32,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* orange glow (theme match) */}
      <div className="absolute left-0 top-0 h-full w-[50%] bg-gradient-to-r from-[#FF5A14]/10 via-transparent to-transparent" />

      {/* fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white" />
    </div>
  );
}

export default function BlogListClient() {
  return (
    <div className="relative min-h-[92vh] overflow-hidden bg-white px-4 py-10 md:px-6 md:py-16">
      <GridBackground />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF5A14]/20 bg-[#FFF4EE] px-4 py-1.5 text-sm text-[#FF5A14] shadow-sm">
            <Folder className="h-4 w-4" />
            Topicler Blog
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#0B1220] md:text-5xl">
            Explore Our <span className="text-[#FF5A14]">Blogs</span>
          </h1>

          <p className="mt-4 leading-relaxed text-slate-600">
            Discover high-quality articles designed to be simple, practical, and
            easy to understand.
          </p>

          <p className="mt-4 text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-[#0B1220]">
              {BLOGS.length}
            </span>{" "}
            post{BLOGS.length === 1 ? "" : "s"}
          </p>
        </div>

        {/* Blog Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {BLOGS.map((blog, index) => (
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

        {/* Footer Note */}
        <p className="mt-12 text-center text-sm text-slate-500">
          Topicler blogs are crafted for clarity, speed, and real-world value.
        </p>
      </div>
    </div>
  );
}