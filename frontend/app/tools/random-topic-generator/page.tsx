import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarRange,
  ChevronRight,
  Compass,
  FileText,
  Layers,
  ListChecks,
  PenLine,
  PlaySquare,
  Search,
  Sparkles,
  Clapperboard,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import TopicGenerator from "@/src/components/topic-generator/TopicGenerator";
import FAQ, { type FaqItem } from "@/src/components/topic-generator/FAQ";

export const metadata: Metadata = {
  title: "AI Random Topic Generator | Topicla",
  description:
    "Generate fresh topic ideas for blogs, SEO content, videos, social media, and more with Topicla's AI topic generator.",
  openGraph: {
    title: "AI Random Topic Generator | Topicla",
    description:
      "Generate fresh topic ideas for blogs, SEO content, videos, social media, and more with Topicla's AI topic generator.",
    type: "website",
  },
};

const steps = [
  {
    icon: PenLine,
    title: "Specify Your Niche",
    text: "Enter your industry, niche, keyword, or content idea.",
  },
  {
    icon: Sparkles,
    title: "Generate Topics",
    text: "AI brainstorms relevant and varied topic ideas around your input.",
  },
  {
    icon: ListChecks,
    title: "Review & Select",
    text: "Choose the ideas that best fit your content strategy.",
  },
  {
    icon: FileText,
    title: "Create Content",
    text: "Turn your strongest ideas into articles, videos, posts, or resources.",
  },
];

const useCases = [
  {
    icon: CalendarRange,
    title: "Overcoming Content Calendar Gaps",
    text: "When next month's calendar has empty slots and deadlines are close, generate a batch of ideas in your niche and fill the gaps with topics that still match your audience, instead of publishing whatever comes to mind first.",
  },
  {
    icon: Compass,
    title: "Finding New Content Angles",
    text: "If you've covered the obvious subjects already, the tool surfaces formats you may not have tried: a common-mistakes piece, a comparison, a beginner primer, or a question your readers ask but nobody answers well.",
  },
  {
    icon: Layers,
    title: "Planning a Blog Series",
    text: "Look for ideas that naturally build on each other, from a beginner guide to an advanced breakdown, and group them into a series. Connected posts are easier to interlink and keep readers moving through your site.",
  },
  {
    icon: Search,
    title: "Starting Keyword Research",
    text: "Use generated titles as seed phrases for your keyword tool. They help you discover the terms and questions people actually search for, which you can then check for volume, difficulty, and intent.",
  },
];

const faqs: FaqItem[] = [
  {
    question: "How can a random topic generator help with SEO content strategy?",
    answer:
      "It speeds up the earliest stage of planning. Instead of starting from a blank page, you get a spread of angles around one subject, which makes it easier to spot topic clusters, supporting articles, and questions worth targeting. Treat the list as a map of possibilities, then use keyword and competitor research to decide which ideas deserve a page.",
  },
  {
    question: "Should I publish every topic the generator suggests?",
    answer:
      "No. The suggestions are a starting point, not a publishing plan. Some ideas will overlap with content you already have, some won't have search demand, and some won't fit your audience. Shortlist the ones that match your goals, confirm there's real interest, and make sure you can add genuine expertise before writing.",
  },
  {
    question: "What types of content can I create from generated topics?",
    answer:
      "Almost any format. A single idea can become a blog post, a YouTube video, a short-form clip, a newsletter issue, a social thread, a podcast episode, a checklist, or a downloadable guide. The category label on each idea, such as How-To or Comparison, hints at the format that suits it best.",
  },
  {
    question: "How do I turn a generated topic into a rankable piece of content?",
    answer:
      "First, find the main keyword and look at what currently ranks for it so you understand search intent. Then refine the title, outline the questions a reader needs answered, and add something the existing results lack: first-hand experience, original examples, clearer steps, or better visuals. Finish with clean headings, internal links, and a helpful meta description.",
  },
  {
    question: "How many topic ideas should I generate before starting keyword research?",
    answer:
      "A few rounds is usually enough. Twenty to forty ideas across one or two generations gives you a wide pool without becoming overwhelming. Pick the eight to ten strongest, then run those through your keyword tool rather than researching every suggestion.",
  },
  {
    question: "Can I use the generated topics for YouTube videos?",
    answer:
      "Yes. Enter your channel's niche and look for ideas that work well on video, such as tutorials, comparisons, reviews, and myth-busting topics. You'll usually want to rewrite the title to be more conversational and check YouTube search suggestions to see how viewers phrase the same idea.",
  },
  {
    question: "Can I use generated topic ideas commercially?",
    answer:
      "Yes, you can use the ideas for your business, clients, or monetized content. Topic ideas themselves are general, so other people may arrive at similar ones. What makes your content valuable is the research, perspective, and quality you bring when you develop the idea. Always check facts and avoid using other brands' trademarks in misleading ways.",
  },
];

const relatedTools = [
  {
    icon: PenLine,
    title: "Blog Topic Generator",
    text: "Ideas shaped for long-form articles and posts.",
  },
  {
    icon: Clapperboard,
    title: "YouTube Topic Generator",
    text: "Video ideas built around what viewers search for.",
  },
  {
    icon: Lightbulb,
    title: "Content Idea Generator",
    text: "Ideas across social, email, and newsletters.",
  },
  {
    icon: TrendingUp,
    title: "SEO Topic Generator",
    text: "Topic clusters to support organic growth.",
  },
];

// Swap `href: null` for a real path once each page exists, to avoid broken links.
const footerLinks: { label: string; href: string | null }[] = [
  { label: "Tools", href: "#related-tools" },
  { label: "About", href: null },
  { label: "Privacy", href: null },
  { label: "Terms", href: null },
];

export default function RandomTopicGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white text-[#171717]">
      {/* 1. Navigation + breadcrumb */}
      <header className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md text-lg font-bold tracking-tight text-[#171717] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F97316]"
          >
            <span
              aria-hidden="true"
              className="flex size-8 items-center justify-center rounded-lg bg-[#F97316] text-white"
            >
              <Sparkles className="size-4" />
            </span>
            Topicla
          </Link>
          <nav aria-label="Main">
            <a
              href="#related-tools"
              className="rounded-lg px-3 py-2 text-sm font-medium text-[#525252] transition-colors hover:bg-[#FFF7ED] hover:text-[#C2410C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316]"
            >
              AI Tools
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-5 sm:px-6">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-[#525252]">
            <li>
              <Link href="/" className="rounded hover:text-[#C2410C] focus-visible:outline-2 focus-visible:outline-[#F97316]">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-4" />
            </li>
            <li>
              <a href="#related-tools" className="rounded hover:text-[#C2410C] focus-visible:outline-2 focus-visible:outline-[#F97316]">
                AI Tools
              </a>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-4" />
            </li>
            <li aria-current="page" className="font-medium text-[#171717]">
              Random Topic Generator
            </li>
          </ol>
        </nav>

        {/* 2. Hero */}
        <section className="relative px-4 pb-12 pt-14 text-center sm:px-6 sm:pt-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-0 mx-auto h-72 max-w-3xl rounded-full bg-[radial-gradient(closest-side,#FFEDD5,transparent)] opacity-80"
          />
          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FED7AA] bg-[#FFF7ED] px-3 py-1 text-xs font-semibold tracking-wide text-[#C2410C]">
              <Sparkles className="size-3.5" aria-hidden="true" />
              AI TOPIC GENERATOR
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-[#171717] text-balance sm:text-5xl lg:text-6xl">
              Generate Fresh Topics for Your Content
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#525252] text-pretty">
              Generate relevant topic ideas for blogs, videos, SEO content, social media, and more.
              Enter your niche and let AI spark your next great idea.
            </p>
          </div>
        </section>

        {/* 3 + 4. Generate Ideas + Topic Ideas (client) */}
        <TopicGenerator />

        {/* 5. How It Works */}
        <section aria-labelledby="how-heading" className="mt-24 bg-[#FFF7ED] px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 id="how-heading" className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              How It Works
            </h2>
            <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <li key={step.title} className="relative rounded-2xl border border-[#FED7AA] bg-white p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-[#F97316] text-white">
                      <step.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-3xl font-bold tabular-nums text-[#FDBA74]" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-[#525252]">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 6. What is a Random Topic Generator? */}
        <section aria-labelledby="what-heading" className="px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div>
              <h2 id="what-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
                What is a Random Topic Generator?
              </h2>
              <div className="mt-6 max-w-[68ch] space-y-5 text-lg leading-relaxed text-[#525252]">
                <p>
                  A random topic generator is a brainstorming tool that turns a single subject into a
                  list of specific ideas you could write, record, or teach about. You give it a
                  starting point, like an industry, a product, or a keyword, and it suggests topics
                  from angles you might not reach on your own.
                </p>
                <p>
                  For content creators, it removes the hardest part of the job: deciding what to make
                  next. Writer&apos;s block often isn&apos;t a lack of knowledge but a lack of a clear
                  entry point, and a list of concrete titles gives you one. Seeing ideas side by side
                  also makes it easier to notice which ones excite you and which ones your audience
                  genuinely needs.
                </p>
                <p>
                  For SEO professionals, a generator is a fast way to widen the net before keyword
                  research. It mixes formats such as how-to guides, comparisons, common mistakes,
                  and beginner explainers, which helps you plan topic clusters around a core subject
                  rather than chasing one keyword at a time.
                </p>
                <p>
                  Topicla uses AI to understand the context of your input, so the ideas stay relevant
                  instead of being keyword shuffles. Each idea is tagged with a format and angle, so
                  you can quickly tell whether it would work best as a blog post, a video, a
                  discussion prompt, or a downloadable resource.
                </p>
              </div>
            </div>

            <aside
              aria-label="Example of one idea in several formats"
              className="rounded-2xl border border-[#E5E7EB] bg-white p-6 lg:mt-16"
            >
              <p className="text-sm font-medium text-[#525252]">One idea, many formats</p>
              <p className="mt-2 text-lg font-semibold leading-snug">
                7 Beginner Mistakes That Stall Home Workout Progress
              </p>
              <ul className="mt-5 space-y-3 text-[#525252]">
                <li className="flex items-center gap-3">
                  <FileText className="size-5 shrink-0 text-[#F97316]" aria-hidden="true" />
                  A detailed blog post with fixes for each mistake
                </li>
                <li className="flex items-center gap-3">
                  <PlaySquare className="size-5 shrink-0 text-[#F97316]" aria-hidden="true" />
                  A 10-minute video demonstrating correct form
                </li>
                <li className="flex items-center gap-3">
                  <Layers className="size-5 shrink-0 text-[#F97316]" aria-hidden="true" />
                  A carousel post, one mistake per slide
                </li>
                <li className="flex items-center gap-3">
                  <ListChecks className="size-5 shrink-0 text-[#F97316]" aria-hidden="true" />
                  A printable checklist for new members
                </li>
              </ul>
            </aside>
          </div>
        </section>

        {/* 7. When to Use */}
        <section aria-labelledby="when-heading" className="border-y border-[#E5E7EB] bg-[#FAFAFA] px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <h2 id="when-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
                When to Use the Random Topic Generator?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[#525252]">
                Generated ideas are starting points. Validate them with keyword data, audience
                feedback, and your own expertise before investing time in full content.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {useCases.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-7">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-[#FFF7ED] text-[#EA580C]">
                    <item.icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-[#525252]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 8. FAQ */}
        <section aria-labelledby="faq-heading" className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 id="faq-heading" className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-10">
              <FAQ items={faqs} />
            </div>
          </div>
        </section>

        {/* 9. Related Tools */}
        <section
          id="related-tools"
          aria-labelledby="related-heading"
          className="scroll-mt-6 px-4 pb-24 sm:px-6"
        >
          <div className="mx-auto max-w-6xl">
            <h2 id="related-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
              Related Tools
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedTools.map((tool) => (
                <li key={tool.title} className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-[#FFF7ED] text-[#EA580C]">
                      <tool.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-[#F5F5F5] px-2 py-0.5 text-xs font-medium text-[#525252]">
                      Coming soon
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold">{tool.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#525252]">{tool.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* 10. Footer */}
      <footer className="border-t border-[#E5E7EB] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="flex items-center gap-2 text-lg font-bold tracking-tight">
              <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-md bg-[#F97316] text-white">
                <Sparkles className="size-3.5" />
              </span>
              Topicla
            </p>
            <p className="mt-2 text-sm text-[#525252]">AI-powered tools for better ideas and content.</p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <a
                      href={link.href}
                      className="rounded text-[#525252] hover:text-[#C2410C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316]"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <span className="text-[#8A8A8A]">{link.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="border-t border-[#E5E7EB] py-5 text-center text-xs text-[#525252]">
          © Topicla. All rights reserved.
        </div>
      </footer>
    </div>
  );
}