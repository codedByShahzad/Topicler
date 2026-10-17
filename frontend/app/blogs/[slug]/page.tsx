import { Fragment, type ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  Clock,
  Folder,
  ArrowUpRight,
} from "lucide-react";

import { getSolvixBlogs } from "@/src/lib/solvix";
import type {
  BlogBlock,
  BlogSection,
} from "../../../src/lib/blog";

import TocClient from "./TocClient";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://topicler.com";

/* -------------------------------------------------------------------------- */
/*                              DATE HELPERS                                  */
/* -------------------------------------------------------------------------- */

function toISODateSafe(dateStr?: string) {
  if (!dateStr) return undefined;

  const d = new Date(dateStr);

  return Number.isNaN(d.getTime())
    ? undefined
    : d.toISOString();
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";

  const date = new Date(dateStr);

  if (Number.isNaN(date.getTime())) {
    return dateStr;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/* -------------------------------------------------------------------------- */
/*                              IMAGE HELPERS                                 */
/* -------------------------------------------------------------------------- */

function absoluteUrl(
  path?: string | StaticImageData
) {
  if (!path) {
    return `${SITE_URL}/images/ogImage.jpg`;
  }

  const imagePath =
    typeof path === "string"
      ? path
      : path.src;

  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://")
  ) {
    return imagePath;
  }

  return `${SITE_URL}${
    imagePath.startsWith("/")
      ? imagePath
      : `/${imagePath}`
  }`;
}

/**
 * Cloudinary can optimize the image before it reaches
 * the visitor's browser.
 *
 * Example:
 * https://res.cloudinary.com/.../image/upload/abc/image.jpg
 *
 * becomes:
 * https://res.cloudinary.com/.../image/upload/f_auto,q_auto,w_1600/abc/image.jpg
 */
function optimizeCloudinaryImage(
  image?: string
) {
  if (!image) {
    return "/images/ogImage.png";
  }

  if (
    !image.includes("res.cloudinary.com") ||
    !image.includes("/image/upload/")
  ) {
    return image;
  }

  if (
    image.includes("f_auto") ||
    image.includes("q_auto")
  ) {
    return image;
  }

  return image.replace(
    "/image/upload/",
    "/image/upload/f_auto,q_auto,w_1600/"
  );
}

/* -------------------------------------------------------------------------- */
/*                                  TYPES                                     */
/* -------------------------------------------------------------------------- */

type SolvixBlog = {
  _id?: string;
  id?: string;

  website?: {
    _id?: string;
    id?: string;
    name?: string;
    domain?: string;
  };

  slug: string;
  title: string;
  subtitle?: string;

  heroImage?: string;
  category?: string;

  publishDate?: string;
  publishISO?: string;
  readingTime?: string;

  canonicalPath?: string;

  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];

  ogImage?: string;

  sections?: SolvixSection[];

  /**
   * Rich-text editor document (Tiptap / ProseMirror JSON) and the table of
   * contents built from its H2/H3 headings. Present for posts saved with the
   * Solvix rich-text editor; older posts only have `sections`.
   */
  contentJson?: unknown;
  toc?: SolvixTocEntry[];
};

type SolvixTocEntry = {
  id: string;
  title: string;
  level?: number;
};

type SolvixSection = {
  id: string;
  title: string;

  blocks?: SolvixBlock[];

  content?: SolvixBlock[];
};

/**
 * IMPORTANT:
 *
 * Solvix's integration API uses:
 *
 * type: "paragraph"
 * type: "list"
 *
 * according to the integration guide.
 *
 * We also keep support for your older:
 *
 * p / ul / h3 / quote
 *
 * format so older Topicler content doesn't break.
 */
type SolvixBlock =
  | {
      type: "paragraph";
      text?: string;
    }
  | {
      type: "list";
      items?: string[];
    }
  | {
      type: "p";
      text?: string;

      content?: {
        type: "text" | "link";
        text: string;
        href?: string;
      }[];
    }
  | {
      type: "h3";
      text: string;
    }
  | {
      type: "ul";
      items: string[];
    }
  | {
      type: "quote";
      text: string;
    };

/* -------------------------------------------------------------------------- */
/*                         SOLVIX DATA HELPERS                                */
/* -------------------------------------------------------------------------- */

async function getBlogsFromSolvix(): Promise<
  SolvixBlog[]
> {
  const response = await getSolvixBlogs();

  if (Array.isArray(response)) {
    return response;
  }

  if (
    response &&
    typeof response === "object" &&
    Array.isArray(response.data)
  ) {
    return response.data;
  }

  return [];
}

/* -------------------------------------------------------------------------- */
/*                         BLOCK CONVERTER                                    */
/* -------------------------------------------------------------------------- */

function convertBlock(
  block: SolvixBlock
): BlogBlock | null {
  /* --------------------------- Solvix paragraph -------------------------- */

  if (block.type === "paragraph") {
    return {
      type: "p",
      text: block.text || "",
    };
  }

  /* ------------------------------ Solvix list ---------------------------- */

  if (block.type === "list") {
    return {
      type: "ul",
      items: block.items || [],
    };
  }

  /* -------------------------- Existing p format -------------------------- */

  if (block.type === "p") {
    if (Array.isArray(block.content)) {
      return {
        type: "p",
        content: block.content.map((part) => {
          if (part.type === "link") {
            return {
              type: "link",
              text: part.text,
              href: part.href || "#",
            };
          }

          return {
            type: "text",
            text: part.text,
          };
        }),
      };
    }

    return {
      type: "p",
      text: block.text || "",
    };
  }

  /* ------------------------------ Heading -------------------------------- */

  if (block.type === "h3") {
    return {
      type: "h3",
      text: block.text,
    };
  }

  /* ------------------------------- List ---------------------------------- */

  if (block.type === "ul") {
    return {
      type: "ul",
      items: block.items,
    };
  }

  /* ------------------------------- Quote --------------------------------- */

  if (block.type === "quote") {
    return {
      type: "quote",
      text: block.text,
    };
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/*                         SECTION CONVERTER                                  */
/* -------------------------------------------------------------------------- */

function convertSections(
  blog: SolvixBlog
): BlogSection[] {
  if (!Array.isArray(blog.sections)) {
    return [];
  }

  return blog.sections.map((section) => {
    const blocks =
      section.blocks ??
      section.content ??
      [];

    return {
      id: section.id,

      title: section.title,

      content: blocks
        .map(convertBlock)
        .filter(
          (block): block is BlogBlock =>
            block !== null
        ),
    };
  });
}

/* -------------------------------------------------------------------------- */
/*                           BLOG CONVERTER                                   */
/* -------------------------------------------------------------------------- */

function convertBlog(blog: SolvixBlog) {
  const publishDate =
    blog.publishDate || "";

  const heroImage = optimizeCloudinaryImage(
    blog.heroImage ||
      blog.ogImage ||
      "/images/ogImage.png"
  );

  return {
    id:
      blog._id ||
      blog.id ||
      blog.slug,

    slug: blog.slug,

    title: blog.title,

    subtitle:
      blog.subtitle || "",

    heroImage,

    category:
      blog.category || "General",

    publishDate,

    formattedPublishDate:
      formatDate(publishDate),

    publishISO:
      blog.publishISO ||
      toISODateSafe(publishDate),

    readingTime:
      blog.readingTime ||
      "5 min read",

    canonicalPath:
      blog.canonicalPath ||
      `/blogs/${blog.slug}`,

    seoTitle:
      blog.seoTitle ||
      blog.title,

    seoDescription:
      blog.seoDescription ||
      blog.subtitle ||
      "",

    keywords:
      Array.isArray(blog.keywords)
        ? blog.keywords
        : [],

    ogImage:
      optimizeCloudinaryImage(
        blog.ogImage ||
          blog.heroImage ||
          "/images/ogImage.png"
      ),

    sections:
      convertSections(blog),
  };
}

/* -------------------------------------------------------------------------- */
/*                              METADATA                                     */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const blogs =
    await getBlogsFromSolvix();

  const solvixBlog =
    blogs.find(
      (blog) => blog.slug === slug
    );

  if (!solvixBlog) {
    return {};
  }

  const blog =
    convertBlog(solvixBlog);

  const rawTitle = (
    blog.seoTitle ??
    blog.title
  )
    .replace(
      /\s*\|\s*Topicler\s*$/i,
      ""
    )
    .trim();

  const description =
    blog.seoDescription ??
    blog.subtitle;

  const canonicalPath =
    blog.canonicalPath ??
    `/blogs/${blog.slug}`;

  const image = absoluteUrl(
    blog.ogImage ??
      blog.heroImage ??
      "/images/ogImage.png"
  );

  const publishedTime =
    blog.publishISO ??
    toISODateSafe(
      blog.publishDate
    );

  return {
    title: rawTitle,

    description,

    alternates: {
      canonical: canonicalPath,
    },

    openGraph: {
      type: "article",

      url: `${SITE_URL}${canonicalPath}`,

      title: rawTitle,

      description,

      images: [
        {
          url: image,

          width: 1200,

          height: 630,

          alt: rawTitle,
        },
      ],

      publishedTime,

      section: blog.category,

      authors: [
        `${SITE_URL}/about/`,
      ],
    },

    twitter: {
      title: rawTitle,

      description,

      images: [image],
    },
  };
}

/* -------------------------------------------------------------------------- */
/*                            BACKGROUND                                     */
/* -------------------------------------------------------------------------- */

function GridBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px)",

          backgroundSize:
            "56px 56px",
        }}
      />

      <div className="absolute right-0 top-0 h-full w-[55%] bg-gradient-to-l from-[#FF5A14]/10 via-[#FFF4EE]/40 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                         SECTION RENDERER                                   */
/* -------------------------------------------------------------------------- */

function SectionRenderer({
  section,
}: {
  section: BlogSection;
}) {
  return (
    <section
      id={section.id}
      className="scroll-mt-24"
    >
      <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
        {section.title}
      </h2>

      <div className="mt-5 space-y-5">
        {section.content.map(
          (
            block: BlogBlock,
            idx: number
          ) => {
            /* ----------------------------- Paragraph ----------------------------- */

if (block.type === "p") {
  // Paragraph containing rich inline content
  if ("content" in block) {
    return (
      <p
        key={idx}
        className="text-base leading-8 text-slate-600"
      >
        {block.content.map((part, partIndex) =>
          part.type === "link" ? (
            <Link
              key={partIndex}
              href={part.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF5A14] underline underline-offset-2 hover:text-[#C63D08]"
            >
              {part.text}
            </Link>
          ) : (
            <span key={partIndex}>
              {part.text}
            </span>
          )
        )}
      </p>
    );
  }

  // Normal paragraph
  return (
    <p
      key={idx}
      className="text-base leading-8 text-slate-600"
    >
      {block.text}
    </p>
  );
}
            /* ------------------------------- H3 -------------------------------- */

            if (
              block.type ===
              "h3"
            ) {
              return (
                <h3
                  key={idx}
                  className="pt-3 text-lg font-semibold leading-7 text-slate-900 md:text-xl"
                >
                  {block.text}
                </h3>
              );
            }

            /* ------------------------------- List ------------------------------ */

            if (
              block.type ===
              "ul"
            ) {
              return (
                <ul
                  key={idx}
                  className="list-disc space-y-3 pl-6 text-base leading-7 text-slate-600"
                >
                  {block.items.map(
                    (
                      item: string,
                      i: number
                    ) => (
                      <li key={i}>
                        {item}
                      </li>
                    )
                  )}
                </ul>
              );
            }

            /* ------------------------------ Quote ------------------------------- */

            if (
              block.type ===
              "quote"
            ) {
              return (
                <blockquote
                  key={idx}
                  className="rounded-2xl border border-[#FF5A14]/20 bg-[#FFF4EE] p-5 text-slate-700"
                >
                  <p className="leading-8">
                    {block.text}
                  </p>
                </blockquote>
              );
            }

            return null;
          }
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                     RICH-TEXT CONTENT (Solvix editor)                      */
/* -------------------------------------------------------------------------- */

/**
 * `sections` is only a plain-text copy of the article: every list arrives as
 * type "list" (numbered lists became bullets), H3s and quotes become
 * paragraphs, and bold / italic / underline / links are dropped. Posts written
 * with the Solvix rich-text editor also carry `contentJson` (the real document)
 * and `toc`, so those are rendered from the document instead.
 *
 * The document is turned into React elements — never injected as HTML — so
 * all text is escaped by React and only the node and mark types handled
 * below can appear. Anything unknown is skipped (its text is kept).
 */

type RichMark = {
  type?: string;
  attrs?: Record<string, unknown>;
};

type RichNode = {
  type?: string;
  attrs?: Record<string, unknown>;
  content?: RichNode[];
  text?: string;
  marks?: RichMark[];
};

type RichContent = {
  nodes: RichNode[];
  toc: SolvixTocEntry[];
};

const RICH_P_CLASS = "text-base leading-8 text-slate-600";

function isRichNode(value: unknown): value is RichNode {
  return (
    !!value &&
    typeof value === "object" &&
    typeof (value as RichNode).type === "string"
  );
}

function richChildren(node: RichNode): RichNode[] {
  return Array.isArray(node.content)
    ? node.content.filter(isRichNode)
    : [];
}

/** Visible text of a node (same rule Solvix uses to build the TOC). */
function richText(node: RichNode): string {
  if (node.type === "text") return typeof node.text === "string" ? node.text : "";
  if (node.type === "hardBreak") return " ";
  return richChildren(node).map(richText).join("");
}

/** The editor document + TOC, or null to fall back to `sections`. */
function getRichContent(blog: SolvixBlog): RichContent | null {
  const doc = blog.contentJson as { type?: unknown; content?: unknown } | null | undefined;

  if (
    !doc ||
    typeof doc !== "object" ||
    doc.type !== "doc" ||
    !Array.isArray(doc.content) ||
    !Array.isArray(blog.toc)
  ) {
    return null;
  }

  const nodes = doc.content.filter(isRichNode);
  if (!nodes.length) return null;

  return {
    nodes,
    toc: blog.toc.filter(
      (entry) =>
        !!entry &&
        typeof entry.id === "string" &&
        typeof entry.title === "string"
    ),
  };
}

/** http(s), mailto, site paths ("/x", not "//host") and #anchors only. */
function safeHref(href: unknown): string | null {
  if (typeof href !== "string") return null;
  const value = href.trim();
  if (!value || /[\s\u0000-\u001f\u007f]/.test(value)) return null;
  return /^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(value) ? value : null;
}

function renderRichInline(nodes: RichNode[], keyPrefix: string): ReactNode[] {
  return nodes.map((node, index) => {
    const key = `${keyPrefix}-${index}`;

    if (node.type === "hardBreak") return <br key={key} />;

    if (node.type !== "text") {
      // Unknown inline wrapper: keep whatever text it contains.
      return <Fragment key={key}>{renderRichInline(richChildren(node), key)}</Fragment>;
    }

    if (typeof node.text !== "string" || !node.text) return null;

    const marks = Array.isArray(node.marks) ? node.marks : [];
    const has = (type: string) => marks.some((mark) => mark?.type === type);

    let element: ReactNode = node.text;
    if (has("strike")) element = <s>{element}</s>;
    if (has("underline")) element = <u className="underline-offset-2">{element}</u>;
    if (has("italic")) element = <em>{element}</em>;
    if (has("bold")) element = <strong className="font-semibold text-slate-800">{element}</strong>;
    if (has("highlight")) element = <mark className="rounded bg-[#FFE7DA] px-0.5 text-inherit">{element}</mark>;

    const href = safeHref(marks.find((mark) => mark?.type === "link")?.attrs?.href);
    if (href) {
      const external = /^https?:\/\//i.test(href);
      element = (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="text-[#FF5A14] underline underline-offset-2 hover:text-[#C63D08]"
        >
          {element}
        </a>
      );
    }

    return <Fragment key={key}>{element}</Fragment>;
  });
}

function renderRichListItems(list: RichNode, keyPrefix: string): ReactNode[] {
  return richChildren(list).map((item, index) => {
    const key = `${keyPrefix}-${index}`;
    const children = richChildren(item);

    // Simple item: just its text. Otherwise: paragraphs and nested lists.
    if (children.length === 1 && children[0].type === "paragraph") {
      return <li key={key}>{renderRichInline(richChildren(children[0]), key)}</li>;
    }

    return (
      <li key={key}>
        <div className="space-y-3">{renderRichBlocks(children, key, "leading-7")}</div>
      </li>
    );
  });
}

function renderRichBlocks(
  nodes: RichNode[],
  keyPrefix: string,
  paragraphClass: string = RICH_P_CLASS,
  headingIds?: Map<number, string>
): ReactNode[] {
  return nodes.map((node, index) => {
    const key = `${keyPrefix}-${index}`;

    switch (node.type) {
      case "paragraph":
        if (!richText(node).trim()) return null;
        return (
          <p key={key} className={paragraphClass}>
            {renderRichInline(richChildren(node), key)}
          </p>
        );

      case "heading": {
        if (!richText(node).trim()) return null;
        const id = headingIds?.get(index);
        const level = Number(node.attrs?.level);

        if (level >= 3) {
          return (
            <h3
              key={key}
              id={id}
              className="scroll-mt-24 pt-3 text-lg font-semibold leading-7 text-slate-900 md:text-xl"
            >
              {renderRichInline(richChildren(node), key)}
            </h3>
          );
        }

        return (
          <h2
            key={key}
            id={id}
            className="scroll-mt-24 pt-5 text-xl font-semibold tracking-tight text-slate-900 first:pt-0 md:text-2xl"
          >
            {renderRichInline(richChildren(node), key)}
          </h2>
        );
      }

      case "bulletList":
        return (
          <ul key={key} className="list-disc space-y-3 pl-6 text-base leading-7 text-slate-600">
            {renderRichListItems(node, key)}
          </ul>
        );

      case "orderedList": {
        const start = Math.floor(Number(node.attrs?.start));
        return (
          <ol
            key={key}
            start={start > 1 ? start : undefined}
            className="list-decimal space-y-3 pl-6 text-base leading-7 text-slate-600"
          >
            {renderRichListItems(node, key)}
          </ol>
        );
      }

      case "blockquote":
        return (
          <blockquote
            key={key}
            className="space-y-3 rounded-2xl border border-[#FF5A14]/20 bg-[#FFF4EE] p-5 text-slate-700"
          >
            {renderRichBlocks(richChildren(node), key, "leading-8")}
          </blockquote>
        );

      case "horizontalRule":
        return <hr key={key} className="border-slate-200" />;

      case "image": {
        const src = typeof node.attrs?.src === "string" ? node.attrs.src.trim() : "";
        if (!/^https:\/\/[^\s"'<>]+$/i.test(src)) return null;
        const alt = typeof node.attrs?.alt === "string" ? node.attrs.alt : "";
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={key}
            src={src}
            alt={alt}
            loading="lazy"
            className="w-full rounded-2xl border border-slate-200"
          />
        );
      }

      default:
        // Unknown block: render its children so no text is lost.
        return (
          <Fragment key={key}>
            {renderRichBlocks(richChildren(node), key, paragraphClass)}
          </Fragment>
        );
    }
  });
}

function RichContentRenderer({ content }: { content: RichContent }) {
  // Solvix builds `toc` from the non-empty top-level H2/H3 headings in
  // document order, so the n-th such heading gets the n-th TOC id.
  const headingIds = new Map<number, string>();
  let tocIndex = 0;

  content.nodes.forEach((node, index) => {
    if (node.type !== "heading" || !richText(node).trim()) return;
    const entry = content.toc[tocIndex++];
    if (entry) headingIds.set(index, entry.id);
  });

  return (
    <div className="space-y-5">
      {renderRichBlocks(content.nodes, "rich", RICH_P_CLASS, headingIds)}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                           BLOG DETAIL PAGE                                */
/* -------------------------------------------------------------------------- */

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } =
    await params;

  const solvixBlogs =
    await getBlogsFromSolvix();

  const solvixBlog =
    solvixBlogs.find(
      (blog) =>
        blog.slug === slug
    );

  if (!solvixBlog) {
    return notFound();
  }

  const blog =
    convertBlog(solvixBlog);

  // Rich-text posts render from the editor document; older posts from sections.
  const richContent =
    getRichContent(solvixBlog);

  /* ---------------------------------------------------------------------- */
  /*                         RELATED POSTS                                  */
  /* ---------------------------------------------------------------------- */

  const related =
    solvixBlogs
      .filter(
        (b) =>
          b.category ===
            solvixBlog.category &&
          b.slug !==
            solvixBlog.slug
      )
      .sort((a, b) => {
        const dateA =
          new Date(
            a.publishDate || 0
          ).getTime();

        const dateB =
          new Date(
            b.publishDate || 0
          ).getTime();

        return dateB - dateA;
      })
      .slice(0, 6)
      .map(convertBlog);

  const tocSections = richContent
    ? richContent.toc
        .filter((entry) => (entry.level ?? 2) === 2)
        .map((entry) => ({
          id: entry.id,
          title: entry.title,
        }))
    : blog.sections.map(
        (section) => ({
          id: section.id,
          title: section.title,
        })
      );

  const publishedTime =
    blog.publishISO ??
    toISODateSafe(
      blog.publishDate
    );

  const articleUrl =
    `${SITE_URL}${
      blog.canonicalPath ??
      `/blogs/${blog.slug}`
    }`;

  const articleImage =
    absoluteUrl(
      blog.ogImage ??
        blog.heroImage ??
        "/images/ogImage.jpg"
    );

  /* ---------------------------------------------------------------------- */
  /*                              JSON-LD                                   */
  /* ---------------------------------------------------------------------- */

  const jsonLd = {
    "@context":
      "https://schema.org",

    "@type": "Article",

    headline:
      blog.seoTitle ??
      blog.title,

    description:
      blog.seoDescription ??
      blog.subtitle,

    image: [
      articleImage,
    ],

    mainEntityOfPage:
      articleUrl,

    url: articleUrl,

    datePublished:
      publishedTime,

    dateModified:
      publishedTime,

    articleSection:
      blog.category,

    keywords:
      blog.keywords?.join(
        ", "
      ),

    author: {
      "@type":
        "Organization",

      name: "Topicler",
    },

    publisher: {
      "@type":
        "Organization",

      name: "Topicler",

      logo: {
        "@type":
          "ImageObject",

        url: `${SITE_URL}/images/logo.png`,
      },
    },
  };

  const breadcrumbJsonLd =
    {
      "@context":
        "https://schema.org",

      "@type":
        "BreadcrumbList",

      itemListElement: [
        {
          "@type":
            "ListItem",

          position: 1,

          name: "Home",

          item: SITE_URL,
        },

        {
          "@type":
            "ListItem",

          position: 2,

          name: "Blog",

          item: `${SITE_URL}/blogs`,
        },

        {
          "@type":
            "ListItem",

          position: 3,

          name: blog.title,

          item: articleUrl,
        },
      ],
    };

  /* ---------------------------------------------------------------------- */
  /*                              UI                                        */
  /* ---------------------------------------------------------------------- */

  return (
    <div className="relative min-h-[92vh] bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              jsonLd
            ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              breadcrumbJsonLd
            ),
        }}
      />

      <GridBackground />

      <div className="mx-auto max-w-360 px-3 py-4 sm:px-4 md:px-6 md:py-10">

        {/* ---------------------------------------------------------------- */}
        {/* HERO                                                             */}
        {/* ---------------------------------------------------------------- */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/70 shadow-sm">

          <div className="relative h-[420px] md:h-[520px]">

            <Image
              src={blog.heroImage}
              alt={blog.title}
              fill
              priority
              quality={75}
              sizes="(max-width: 768px) 100vw, 1400px"
              className="object-cover"
            />

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/35 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-[#020617]/90 via-[#020617]/40 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-10">

              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/90 px-3 py-1 text-xs text-slate-700 backdrop-blur">

                <Folder className="h-4 w-4 text-[#FF5A14]" />

                {blog.category}

              </div>

              <h1 className="mt-3 max-w-5xl text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">

                {blog.title}

              </h1>

              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/85 sm:text-base">

                {blog.subtitle}

              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/80 sm:text-sm">

                <span className="inline-flex items-center gap-2">

                  <CalendarDays className="h-4 w-4 text-[#FFB38F]" />

                  {blog.formattedPublishDate}

                </span>

                <span className="inline-flex items-center gap-2">

                  <Clock className="h-4 w-4 text-[#FFB38F]" />

                  {blog.readingTime}

                </span>

              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* CONTENT                                                          */}
        {/* ---------------------------------------------------------------- */}

        <section className="mt-6 md:mt-8">

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">

            <div className="lg:col-span-8">

              <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm sm:p-6 md:p-8">

                {richContent ? (
                  <RichContentRenderer
                    content={richContent}
                  />
                ) : (
                  <div className="space-y-10">

                    {blog.sections.map(
                      (section) => (
                        <SectionRenderer
                          key={
                            section.id
                          }
                          section={
                            section
                          }
                        />
                      )
                    )}

                  </div>
                )}
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* TABLE OF CONTENTS                                             */}
            {/* ------------------------------------------------------------ */}

            <aside className="hidden self-start lg:sticky lg:top-24 lg:col-span-4 lg:block">

              <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">

                <TocClient
                  sections={
                    tocSections
                  }
                  publishDate={
                    blog.formattedPublishDate
                  }
                  readingTime={
                    blog.readingTime
                  }
                />

              </div>
            </aside>

          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* RELATED POSTS                                                    */}
        {/* ---------------------------------------------------------------- */}

        {related.length > 0 && (
          <section className="mt-10">

            <div className="flex items-center justify-between gap-4">

              <h3 className="text-lg font-semibold text-slate-900">
                Related posts
              </h3>

              <Link
                href="/blogs"
                className="group inline-flex items-center gap-2 rounded-full bg-[#FF5A14] px-4 py-2 text-sm font-medium text-white hover:bg-[#e14e12] hover:shadow-md"
              >
                <span>
                  View all
                </span>

                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {related.map(
                (post) => (
                  <Link
                    key={
                      post.slug
                    }
                    href={`/blogs/${post.slug}`}
                    className="group overflow-hidden rounded-xl border border-slate-200 bg-white/80 shadow-sm transition hover:border-[#FF5A14]/30 hover:bg-[#FFF4EE]"
                  >

                    <div className="relative h-60">

                      <Image
                        src={
                          post.heroImage
                        }
                        alt={
                          post.title
                        }
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={70}
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent" />

                      <div className="absolute bottom-3 left-3">

                        <span className="rounded-full border border-slate-200 bg-white/90 px-2.5 py-1 text-xs text-slate-700">

                          {post.category}

                        </span>

                      </div>
                    </div>

                    <div className="p-5">

                      <h4 className="line-clamp-2 text-base font-semibold text-slate-900 transition group-hover:text-[#FF5A14]">

                        {post.title}

                      </h4>

                      <p className="mt-2 line-clamp-2 text-sm text-slate-600">

                        {post.subtitle}

                      </p>

                      <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">

                        <span className="inline-flex items-center gap-1">

                          <CalendarDays className="h-4 w-4" />

                          {post.formattedPublishDate}

                        </span>

                        <span className="inline-flex items-center gap-1">

                          <Clock className="h-4 w-4" />

                          {post.readingTime}

                        </span>

                      </div>
                    </div>

                  </Link>
                )
              )}

            </div>
          </section>
        )}

      </div>
    </div>
  );
}