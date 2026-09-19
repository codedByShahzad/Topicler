import type { Metadata } from "next";
import { SITE_URL } from "@/app/layout";
import {
  CalendarRange,
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
  title: "Random Topic Generator — Free AI Topic Ideas",

  description:
    "Generate ten fresh random topics instantly with our free AI-powered " +
    "generator. Ideal for essays, blog posts, speeches, debates and " +
    "conversation starters.",

  alternates: { canonical: "/tools/random-topic-generator/" },

  openGraph: {
    type: "website",
    url: `${SITE_URL}/tools/random-topic-generator/`,
    title: "Random Topic Generator — Free AI Topic Ideas",
    description: "Ten fresh AI-generated topics in one click. Free, no sign-up.",
    // TODO: swap to a dedicated OG image once created, e.g.
    // images: [{ url: "/images/og-random-topic-generator.png",
    //            width: 1200, height: 630,
    //            alt: "Topicler Random Topic Generator" }],
  },

  twitter: {
    title: "Random Topic Generator — Free AI Topic Ideas",
    description: "Ten fresh AI-generated topics in one click. Free, no sign-up.",
  },
};

/*
 * Page animations — pure CSS, no JavaScript, no extra packages.
 * - Hero: one short load sequence (icon pops, text and generator rise in).
 * - How It Works: steps appear one by one and the connector lines "draw" as you scroll.
 * - Other sections: a soft fade-up when they scroll into view.
 * Everything is skipped for users who enable "reduce motion". Browsers without
 * scroll-driven animation support simply show the content without the scroll effects.
 */
const motionCss = `
@keyframes tp-rise { from { opacity: 0; translate: 0 18px; } to { opacity: 1; translate: none; } }
@keyframes tp-pop { 0% { opacity: 0; scale: 0.6; } 70% { opacity: 1; scale: 1.06; } 100% { opacity: 1; scale: 1; } }
@keyframes tp-float { 0%, 100% { translate: 0 0; } 50% { translate: 0 -5px; } }
@keyframes tp-draw-x { from { scale: 0 1; } to { scale: 1 1; } }
@keyframes tp-draw-y { from { scale: 1 0; } to { scale: 1 1; } }

@media (prefers-reduced-motion: no-preference) {
  .tp-pop { animation: tp-pop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
  .tp-float { animation: tp-float 4s ease-in-out 0.9s infinite; }
  .tp-rise { animation: tp-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .tp-d1 { animation-delay: 0.12s; }
  .tp-d2 { animation-delay: 0.24s; }
  .tp-d3 { animation-delay: 0.38s; }

  @supports (animation-timeline: view()) {
    .tp-reveal {
      animation: tp-rise linear both;
      animation-timeline: view();
      animation-range: entry 0% cover 30%;
    }

    .tp-line-x { transform-origin: left center; }
    .tp-line-y { transform-origin: center top; }

    /* Mobile + tablet: each step and line animates as it enters the screen */
    .tp-step { animation: tp-rise linear both; animation-timeline: view(); animation-range: entry 0% cover 25%; }
    .tp-line-y { animation: tp-draw-y linear both; animation-timeline: view(); animation-range: entry 0% cover 35%; }

    /* Desktop: steps share one timeline so they appear left to right */
    @media (min-width: 1024px) {
      .tp-steps { view-timeline-name: --tp-steps; }
      .tp-step { animation-timeline: --tp-steps; animation-range: cover 12% cover 26%; }
      .tp-step:nth-child(2) { animation-range: cover 18% cover 32%; }
      .tp-step:nth-child(3) { animation-range: cover 24% cover 38%; }
      .tp-step:nth-child(4) { animation-range: cover 30% cover 44%; }
      .tp-line-x { animation: tp-draw-x linear both; animation-timeline: --tp-steps; animation-range: cover 20% cover 32%; }
      .tp-step:nth-child(2) .tp-line-x { animation-range: cover 26% cover 38%; }
      .tp-step:nth-child(3) .tp-line-x { animation-range: cover 32% cover 44%; }
    }
  }
}
`;

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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://topicler.com/tools/random-topic-generator#webapp",
      name: "Random Topic Generator",
      description:
        "Generate random topic ideas for blogs, SEO content, YouTube videos, social media, and more.",
      url: "https://topicler.com/tools/random-topic-generator",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web Browser",
      browserRequirements: "Requires JavaScript",
      provider: {
        "@type": "Organization",
        name: "Topicler",
        url: "https://topicler.com",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://topicler.com/tools/random-topic-generator#webpage",
      url: "https://topicler.com/tools/random-topic-generator",
      name: "Random Topic Generator | Generate Topic Ideas | Topicler",
      description:
        "Generate random topic ideas for blogs, SEO content, YouTube videos, social media, and more.",
      isPartOf: {
        "@type": "WebSite",
        name: "Topicler",
        url: "https://topicler.com",
      },
      about: {
        "@type": "Thing",
        name: "Topic Generation",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "FAQPage",
      "@id": "https://topicler.com/tools/random-topic-generator#faq",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function RandomTopicGeneratorPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-white text-[#171717]">
      <style dangerouslySetInnerHTML={{ __html: motionCss }} />

      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* 2. Hero */}
        <section className="relative px-4 pb-12 pt-14 text-center sm:px-6 sm:pt-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-0 mx-auto h-72 max-w-3xl rounded-full bg-[radial-gradient(closest-side,#FFEDD5,transparent)] opacity-80"
          />
          <div className="relative mx-auto">
            <span className="tp-pop inline-block">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                aria-hidden="true"
                className="tp-float mx-auto size-12 sm:size-14"
              >
                <path
                  d="M10 4h16a6 6 0 0 1 6 6v11a6 6 0 0 1-6 6H14l-6.2 5.4A1 1 0 0 1 6 31.6v-5.2A6 6 0 0 1 4 21V10a6 6 0 0 1 6-6z"
                  fill="#F97316"
                />
                <path
                  d="M22 15h16a6 6 0 0 1 6 6v11a6 6 0 0 1-2 4.4v5.2a1 1 0 0 1-1.8.8L34 38H22a6 6 0 0 1-6-6V21a6 6 0 0 1 6-6z"
                  fill="#F97316"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  paintOrder="stroke"
                />
                <rect
                  x="22"
                  y="23"
                  width="16"
                  height="3.5"
                  rx="1.75"
                  fill="#FFFFFF"
                />
                <rect
                  x="22"
                  y="29"
                  width="10"
                  height="3.5"
                  rx="1.75"
                  fill="#FFFFFF"
                />
              </svg>
            </span>

            <h1 className="tp-rise tp-d1 mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-[#171717] text-balance sm:text-5xl lg:text-5xl">
              Generate Random Topics for Writing
            </h1>

            <p className="tp-rise tp-d2 mx-auto mt-5 max-w-5xl text-lg leading-relaxed text-[#525252] text-pretty">
              Generate random topic ideas for SEO content, blog posts, videos, and discussions. This tool helps spark content ideas, expand topical coverage, and support keyword research and content planning.
            </p>
          </div>
        </section>

        {/* 3 + 4. Generate Ideas + Topic Ideas (client) */}
        <div className="tp-rise tp-d3">
          <TopicGenerator />
        </div>

        {/* 5. How It Works */}
        <section
          aria-labelledby="how-heading"
          className="mt-24 bg-[#FFF7ED] px-4 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <h2
              id="how-heading"
              className="tp-reveal text-center text-3xl font-bold tracking-tight sm:text-4xl"
            >
              How It Works
            </h2>

            <ol className="tp-steps mx-auto mt-12 max-w-xl lg:mt-14 lg:grid lg:max-w-none lg:grid-cols-4 lg:gap-x-6">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  className="tp-step group relative flex gap-5 pb-8 last:pb-0 lg:flex-col lg:items-center lg:gap-0 lg:pb-0 lg:text-center"
                >
                  {i < steps.length - 1 && (
                    <>
                      {/* Vertical connector (mobile + tablet) */}
                      <span
                        aria-hidden="true"
                        className="tp-line-y absolute bottom-0 left-8 top-16 w-0.5 -translate-x-1/2 bg-[linear-gradient(to_bottom,#FB923C,#FED7AA)] lg:hidden"
                      />
                      {/* Horizontal connector (desktop) */}
                      <span
                        aria-hidden="true"
                        className="tp-line-x absolute left-[calc(50%+3.25rem)] right-[calc(-50%+1.75rem)] top-10 hidden h-0.5 -translate-y-1/2 bg-[linear-gradient(to_right,#FB923C,#FED7AA)] lg:block"
                      />
                    </>
                  )}

                  <span className="relative z-10 flex size-16 shrink-0 items-center justify-center rounded-full border-2 border-[#FDBA74] bg-white text-[#EA580C] shadow-[0_6px_16px_-8px_rgba(234,88,12,0.45)] transition-[background-color,color,border-color,transform] duration-300 ease-out group-hover:border-[#F97316] group-hover:bg-[#F97316] group-hover:text-white group-hover:[transform:scale(1.06)] motion-reduce:transition-none lg:size-20">
                    <step.icon
                      className="size-6 lg:size-7"
                      aria-hidden="true"
                    />
                  </span>

                  <div className="flex-1 rounded-2xl bg-white/70 p-5 ring-1 ring-[#FED7AA]/60 transition-[background-color,box-shadow] duration-300 group-hover:bg-white group-hover:shadow-[0_14px_30px_-18px_rgba(234,88,12,0.4)] motion-reduce:transition-none lg:mt-6 lg:w-full lg:flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C2410C]">
                      Step {i + 1}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-[#171717]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 leading-relaxed text-[#525252]">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 6. What is a Random Topic Generator? */}
        <section
          aria-labelledby="what-heading"
          className="px-4 py-20 sm:px-6"
        >
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div className="tp-reveal">
              <h2
                id="what-heading"
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                What is a Random Topic Generator?
              </h2>
              <div className="mt-6 max-w-[68ch] space-y-5 text-lg leading-relaxed text-[#525252]">
                <p>
                  A random topic generator is a brainstorming tool that turns a
                  single subject into a list of specific ideas you could write,
                  record, or teach about. You give it a starting point, like an
                  industry, a product, or a keyword, and it suggests topics
                  from angles you might not reach on your own.
                </p>
                <p>
                  For content creators, it removes the hardest part of the job:
                  deciding what to make next. Writer&apos;s block often
                  isn&apos;t a lack of knowledge but a lack of a clear entry
                  point, and a list of concrete titles gives you one. Seeing
                  ideas side by side also makes it easier to notice which ones
                  excite you and which ones your audience genuinely needs.
                </p>
                <p>
                  For SEO professionals, a generator is a fast way to widen the
                  net before keyword research. It mixes formats such as how-to
                  guides, comparisons, common mistakes, and beginner explainers,
                  which helps you plan topic clusters around a core subject
                  rather than chasing one keyword at a time.
                </p>
                <p>
                  Topicla uses AI to understand the context of your input, so
                  the ideas stay relevant instead of being keyword shuffles. Each
                  idea is tagged with a format and angle, so you can quickly
                  tell whether it would work best as a blog post, a video, a
                  discussion prompt, or a downloadable resource.
                </p>
              </div>
            </div>

            <aside
              aria-label="Example of one idea in several formats"
              className="tp-reveal rounded-2xl border border-[#E5E7EB] bg-white p-6 lg:mt-16"
            >
              <p className="text-sm font-medium text-[#525252]">
                One idea, many formats
              </p>
              <p className="mt-2 text-lg font-semibold leading-snug">
                7 Beginner Mistakes That Stall Home Workout Progress
              </p>
              <ul className="mt-5 space-y-3 text-[#525252]">
                <li className="flex items-center gap-3">
                  <FileText
                    className="size-5 shrink-0 text-[#F97316]"
                    aria-hidden="true"
                  />
                  A detailed blog post with fixes for each mistake
                </li>
                <li className="flex items-center gap-3">
                  <PlaySquare
                    className="size-5 shrink-0 text-[#F97316]"
                    aria-hidden="true"
                  />
                  A 10-minute video demonstrating correct form
                </li>
                <li className="flex items-center gap-3">
                  <Layers
                    className="size-5 shrink-0 text-[#F97316]"
                    aria-hidden="true"
                  />
                  A carousel post, one mistake per slide
                </li>
                <li className="flex items-center gap-3">
                  <ListChecks
                    className="size-5 shrink-0 text-[#F97316]"
                    aria-hidden="true"
                  />
                  A printable checklist for new members
                </li>
              </ul>
            </aside>
          </div>
        </section>

        {/* 7. When to Use */}
        <section
          aria-labelledby="when-heading"
          className="border-y border-[#E5E7EB] bg-[#FAFAFA] px-4 py-20 sm:px-6"
        >
          <div className="mx-auto max-w-6xl">
            <div className="tp-reveal max-w-2xl">
              <h2
                id="when-heading"
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                When to Use the Random Topic Generator?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[#525252]">
                Generated ideas are starting points. Validate them with keyword
                data, audience feedback, and your own expertise before
                investing time in full content.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {useCases.map((item) => (
                <article
                  key={item.title}
                  className="tp-reveal group rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:border-[#FED7AA] hover:shadow-[0_16px_32px_-20px_rgba(234,88,12,0.45)] hover:[transform:translateY(-4px)] motion-reduce:transition-none sm:p-7"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-[#FFF7ED] text-[#EA580C] transition-colors duration-300 group-hover:bg-[#F97316] group-hover:text-white motion-reduce:transition-none">
                    <item.icon className="size-5" aria-hidden="true" />
                  </span>

                  <h3 className="mt-5 text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-2 leading-relaxed text-[#525252]">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 8. FAQ */}
        <section
          aria-labelledby="faq-heading"
          className="px-4 py-20 sm:px-6"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="faq-heading"
              className="tp-reveal text-center text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Frequently Asked Questions
            </h2>

            <div className="mt-10">
              <FAQ items={faqs} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}